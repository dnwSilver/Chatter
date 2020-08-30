import {Test, TestingModule} from '@nestjs/testing'
import {AuthController} from './auth.controller'
import {AuthModule} from './auth.module'
import {AppService} from '../app.service'
import {UsersModule} from '../users/users.module'
import {AppController} from '../app.controller'

describe('Auth controller', () => {
    let controller: AuthController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule, UsersModule],
            controllers: [AppController],
            providers: [AppService],
        }).compile()

        controller = module.get<AuthController>(AuthController)
    })


    describe('method login', () => {
        it('must return access token', async () => {
            expect(await controller.login({})).toContain(['access_token'])
        })
    })

    describe('method getProfile', () => {
        it('should be unauthorized', () => {
            expect(controller.getProfile({})).toBe(undefined)
        })
    })
})
