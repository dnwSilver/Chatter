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
    if(!user){
      throw Error('You need a user to generate a token')
    }
    const response=await request(this.app.getHttpServer())
      .post('/auth/sign-in')
      .set('Accept', 'application/json')
      .send({email: user.email, password: user.password})

    return response.body.token
  }
}

export default new AppEnvironment()
