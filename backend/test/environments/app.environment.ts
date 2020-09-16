import {INestApplication, ValidationPipe} from '@nestjs/common'
import {Test}                             from '@nestjs/testing'
import * as request                       from 'supertest'
import {AppModule}                        from '../../src/app.module'
import {parseCookiesFromResponse}         from '../../src/utils/parseCookies'
import userEnvironment                    from './user.environment'

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

  public async generateAccessToken({email=undefined, password=undefined}): Promise<string> {
    if(!email){
      email='Gregor@clegane.io'
      password='TywinLannistersMadDog'
      await userEnvironment.addUser({email, realPassword: password})
    }

    if(!userEnvironment.users.find({email})){
      throw Error('👌 you can\'t just take and generate token without user')
    }
    const response=await request(this.app.getHttpServer())
      .post('/auth/sign-in')
      .set('Accept', 'application/json')
      .send({email: email, password: password})

    const token=parseCookiesFromResponse(response)['Token']
    if(!token){
      throw Error('🧨 failed to create a token for authorization')
    }
    return token
  }
}

export default new AppEnvironment()
