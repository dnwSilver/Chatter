import * as request from 'supertest'
import {Test} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import {AuthModule} from '../src/auth/auth.module'

describe('(e2e) Auth Controller', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AuthModule],
        }).compile()

        app = moduleRef.createNestApplication()
        await app.init()
    })

    it('should be defined', () => {
        expect(app).toBeDefined()
    })

    describe('[GET] Profile', () => {
        it(`must return 401 unauthorized`, () =>
            request(app.getHttpServer())
                .get('/auth/profile')
                .expect(401)
                .expect({
                    statusCode: 401,
                    message: 'Unauthorized'
                })
        )

        it(`should be authorized`, () =>
            request(app.getHttpServer())
                .get('/auth/profile')
                .expect(200)
                .expect({
                    statusCode: 401,
                    message: 'Unauthorized'
                })
        )
    })

    afterAll(async () => {
        await app.close()
    })
})
