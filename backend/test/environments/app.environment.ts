import {INestApplication, ValidationPipe} from '@nestjs/common'
import {Test}                             from '@nestjs/testing'
import * as request                       from 'supertest'
import {AppModule}                        from '../../src/app.module'
import {User}                             from '../../src/users/user.schema'

class AppEnvironment {
  private app: INestApplication

  public async setup(): Promise<INestApplication> {
    const moduleRef=await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    const app: INestApplication=moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
    this.app=app
    return app
  }

  public async generateAccessToken(user: User): Promise<string> {
    const password='YouDontNothing'
    if(!user){
      throw Error('👌 you can\'t just take and generate token without user')
    }
    const response=await request(this.app.getHttpServer())
      .post('/auth/sign-in')
      .set('Accept', 'application/json')
      .send({email: user.email, password: password})

    if(!response.body.token){
      throw Error('Failed to create a token for authorization')
    }
    return response.body.token
  }
}

export default new AppEnvironment()
