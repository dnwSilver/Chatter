import {HttpStatus, INestApplication} from '@nestjs/common'
import * as bcrypt                    from 'bcrypt'
import * as request                   from 'supertest'
import {SignUpDto}                    from '../../src/auth/dto/sign-up.dto'
import inMemoryDatabase               from '../database.inmemory'
import AppEnvironment                 from '../environments/app.environment'
import UserEnvironment                from '../environments/user.environment'

describe('auth controller', ()=>{
  let app: INestApplication
  beforeAll(async ()=>{
    await inMemoryDatabase.start()
    await UserEnvironment.setup()
    app= await AppEnvironment.setup()
  })

  afterEach(async ()=>{
    await inMemoryDatabase.cleanup()
  })

  it('should be defined', ()=>{
    expect(app).toBeDefined()
  })
  describe('without auth', ()=>{
    it('when ask auth information should detect that we are not logged in', async ()=>{
      await request(app.getHttpServer())
        .get('/auth')
        .expect(HttpStatus.UNAUTHORIZED)
    })
    it('when remove auth should detect that we are not logged in', async ()=>{
      await request(app.getHttpServer())
        .delete('/auth/sign-out')
        .expect(HttpStatus.UNAUTHORIZED)
    })
    describe('when sign up', ()=>{
      const signupDto: SignUpDto={
        email: 'Daeny@targaryen.com',
        login: 'MotherOfDragon',
        name: 'Daenerys',
        password: '$2b$10$KVZZbfZVNNN14oGlevEoH.ff.llu3x0rNlVV.vvlOezPVHPGbjSD6' // dracarys
      }

      it('response should have status created', async ()=>{
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(signupDto)
          .expect(HttpStatus.CREATED)
          .expect(response=>{
            delete response.body.id
            return {
              email: 'Daeny@targaryen.com',
              login: 'MotherOfDragon',
              name: 'Daenerys'
            }
          })
      })
      it('without email response should be bad request', async ()=>{
        const body={...signupDto}
        delete body.email
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('without name response should be bad request', async ()=>{
        const body={...signupDto}
        delete body.name
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('without password response should be bad request', async ()=>{
        const body={...signupDto}
        delete body.password
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('without login response should be bad request', async ()=>{
        const body={...signupDto}
        delete body.login
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it.each(['wrong', 'wrong@', '@wrong.ru', 'wrong@w.w.w'])(
        'when wrong email response should be bad request',
        async (wrongEmail)=>{
          const body={...signupDto, email: wrongEmail}
          await request(app.getHttpServer())
            .post('/auth/sign-up')
            .send(body)
            .expect(HttpStatus.BAD_REQUEST)
        })
      it('when short login response should be bad request', async ()=>{
        const body={...signupDto, login: 'Sandor2'}
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when long login response should be bad request', async ()=>{
        const body={
          ...signupDto,
          login: 'DaenerysStormbornUnburntQueenMeereenaQueenOfTheAndalsRhoynarAndTheFirstMenKhaleesiOfTheGreatSeaOfGrassShacklesbreakerMotherOfDragons'
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when short name response should be bad request', async ()=>{
        const body={
          ...signupDto,
          name: 'J'
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when long name response should be bad request', async ()=>{
        const body={
          ...signupDto,
          name: ''
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when short password response should be bad request', async ()=>{
        const body={
          ...signupDto,
          password: 'game'
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when long password response should be bad request', async ()=>{
        const body={
          ...signupDto,
          password: `wow${await bcrypt.hash('i', 10)}`
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when email already in use should be bad request', async ()=>{
        UserEnvironment.addUser('Daeny@targaryen.com')
        const body={
          ...signupDto,
          email: 'Daeny@targaryen.com'
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
    })
  })

  describe('with auth', ()=>{

    describe('method GET', ()=>{

      it('should be authorized', async ()=>{
        let authInfo={email: 'John@email.com', password: 'hash'}

        // await request(app.getHttpServer())
        //     .post('/auth/sign-up')
        //     .send(regInfo)
        //     .expect(201)

        const authResponse=await request(app.getHttpServer()).post('/auth/sign-in')
          .set('Accept', 'application/json')
          .send(authInfo)
          .expect(201)

        const response=await request(app.getHttpServer())
          .get('/auth')
          .set('Authorization', 'Bearer ${authResponse.body.access_token}')

        expect(response.status).toBe(HttpStatus.OK)
      })
    })

    describe('method POST (sign-in)', ()=>{
      const url='/auth/sign-in'

      it('disallow invalid credentials', async ()=>{
        const authInfo={username: 'wrong', password: 'bad'}
        const response=await request(app.getHttpServer())
          .post(url)
          .send(authInfo)
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED)
      })

      it('return an authorization token for valid credentials', async ()=>{
        const authInfo={username: 'john', password: 'changeme'}
        const response=await request(app.getHttpServer())
          .post(url)
          .send(authInfo)
        expect(response.status).toBe(HttpStatus.CREATED)
        expect(response.body.access_token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU5ODgxMzM1NCwiZXhwIjoxNTk4ODEzNDE0fQ.ITimEs3BQkR0hFo6O1On_YodyDScgLiR_GdghJYP6Hg')
      })
    })
  })

  afterAll(async ()=>{
    await inMemoryDatabase.stop()
    await app.close()
  })
})
