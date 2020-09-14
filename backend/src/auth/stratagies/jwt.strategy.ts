import {Injectable}           from '@nestjs/common'
import {ConfigService}        from '@nestjs/config'
import {PassportStrategy}     from '@nestjs/passport'
import {Request}              from 'express'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {configConstants}      from '../../config/constants'
import {UsersService}         from '../../users/users.service'
import {TokenPayload}         from '../interfaces/tokenPayload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request)=>parseCookies(request)['jwt']]),
      secretOrKey: configService.get(configConstants.jwt.secret)
    })
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload.userId)
  }
}

const parseCookies=function(request) {
  const cookies={}
  request.headers?.cookie?.split(';').forEach(function(cookie) {
    const parts=cookie.match(/(.*?)=(.*)$/)
    if(parts)
      cookies[parts[1].trim()]=(parts[2]||'').trim()
  })
  return cookies
}
