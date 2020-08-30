import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {UsersModule} from '../users/users.module'
import {PassportModule} from '@nestjs/passport'
import {LocalStrategy} from './stratagies/local.stratagy'
import {JwtModule} from '@nestjs/jwt'
import {JwtStrategy} from './stratagies/jwt.strategy'
import {jwtConstants} from './constants'
import {AuthController} from './auth.controller'

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'},
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule{
}
