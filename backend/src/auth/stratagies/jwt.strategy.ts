import {Injectable}           from '@nestjs/common'
import {ConfigService}        from '@nestjs/config'
import {PassportStrategy}     from '@nestjs/passport'
import {Request}              from 'express'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {configConstants}      from '../../config/constants'
import {UsersService}         from '../../users/users.service'
import TokenPayload           from '../interfaces/tokenPayload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request)=>{
        return request?.cookies?.Authentication
      }]),
      secretOrKey: configService.get(configConstants.jwt.secret)
    })
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload.userId)
  }
}