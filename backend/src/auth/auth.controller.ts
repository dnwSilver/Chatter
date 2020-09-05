import {Body, Controller, Delete, Get, Post, Req, UseGuards} from '@nestjs/common'
import {AuthService}                                         from './auth.service'
import {SignUpDto}                                           from './dto/sign-up.dto'
import {JwtAuthGuard}                                        from './guards/jwt-auth.guard'
import {LocalAuthGuard}                                      from './guards/local-auth.guard'
import {RequestWithUser}                                     from './interfaces/requestWithUser.interface'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticationService: AuthService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    request.user
  }

  @Post('sign-up')
  async signUp(@Body() registrationData: SignUpDto) {
    return this.authenticationService.register(registrationData)
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Req() request: RequestWithUser) {
    const {user}=request
    const cookie=this.authenticationService.getCookieWithJwtToken(user.id)
    request.res.setHeader('Set-Cookie', cookie)
    return user
  }

  @UseGuards(JwtAuthGuard)
  @Delete('sign-out')
  async signOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut())
  }
}
