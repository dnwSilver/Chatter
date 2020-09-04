import {INestApplication, ValidationPipe} from '@nestjs/common'
import {Test}                             from '@nestjs/testing'
import {AppModule}                        from '../../src/app.module'
import {DatabaseModule}                   from '../../src/database/database.module'
import DatabaseInMemoryModule             from '../mocks/database.inmemory'

class AppEnvironment {
  public async SetUp(): Promise<INestApplication> {
    const moduleRef=await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: DatabaseModule,
          useValue: DatabaseInMemoryModule
        }
      ]
    })
      .overrideProvider(DatabaseModule)
      .useValue(DatabaseInMemoryModule) //todo with does not work
      .compile()

    const app: INestApplication=moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
    return app
  }
}

export default new AppEnvironment()
