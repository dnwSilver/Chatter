import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {ConfigService}                         from '@nestjs/config'
import {JwtService}                            from '@nestjs/jwt'
import * as bcrypt                             from 'bcrypt'
import {configConstants}                       from '../config/constants'
import {UsersService}                          from '../users/users.service'
import {SignUpDto}                             from './dto/sign-up.dto'
import {TokenPayload}                          from './interfaces/tokenPayload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  public async register(registrationData: SignUpDto) {
    const saltRounds=10
    const hashedPassword=await bcrypt.hash(registrationData.password, saltRounds)
    try {
      const createdUser=await this.usersService.create({
        ...registrationData,
        password: hashedPassword
      })
      createdUser.password=undefined
      return createdUser
    } catch(error) {
      if(error?.code===11000){
        throw new HttpException(`User with ${error.keyValue} already exists`, HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload={userId}
    const token=this.jwtService.sign(payload)
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(configConstants.jwt.expiration)}`
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user=await this.usersService.getByEmail(email)
      await this.verifyPassword(plainTextPassword, user.password)
      return user
    } catch(error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching=await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    )
    if(!isPasswordMatching){
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
    }
  }
}
