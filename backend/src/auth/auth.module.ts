import {Module}          from '@nestjs/common'
import {ConfigService}   from '@nestjs/config'
import {JwtModule}       from '@nestjs/jwt'
import {PassportModule}  from '@nestjs/passport'
import {ConfigModule}    from '../config/config.module'
import {configConstants} from '../config/constants'
import {UsersModule}     from '../users/users.module'
import {AuthController}  from './auth.controller'
import {AuthService}     from './auth.service'
import {JwtStrategy}     from './stratagies/jwt.strategy'
import {LocalStrategy}   from './stratagies/local.stratagy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService)=>({
        secret: configService.get(configConstants.jwt.secret),
        signOptions: {
          expiresIn: `${configService.get(configConstants.jwt.expiration)}s`
        }
      })
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
