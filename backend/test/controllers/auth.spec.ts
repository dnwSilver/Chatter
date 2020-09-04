import {HttpStatus, INestApplication} from '@nestjs/common'
import * as bcrypt                    from 'bcrypt'
import * as request                   from 'supertest'
import SignUpDto                      from '../../src/auth/dto/sign-up.dto'
import AppEnvironment                 from '../environments/app.environment'
import UserEnvironment                from '../environments/user.environment'

describe('auth controller', ()=>{
  let app: INestApplication
  beforeAll(async ()=>{
    await UserEnvironment.SetUp()
    app= await AppEnvironment.SetUp()
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
      const signUpDto: SignUpDto={email: 'Daeny@targaryen.com', login: 'MotherOfDragon', name: 'Daenerys', password: 'dracarys'}
      it('response should have status created', async ()=>{
        const passwordHash=await bcrypt.hash('dracarys', 10)
        console.log(passwordHash)
        const dto: SignUpDto={email: 'Daeny@targaryen.com', login: 'MotherOfDragon', name: 'Daenerys', password: passwordHash}
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(dto)
          .expect(HttpStatus.CREATED)
      })
      it('without email response should have status bad request', async ()=>{
        const body={...signUpDto}
        delete body.email
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('without name response should have status bad request', async ()=>{
        const body={...signUpDto}
        delete body.name
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('without password response should have status bad request', async ()=>{
        const body={...signUpDto}
        delete body.password
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('without login response should have status bad request', async ()=>{
        const body={...signUpDto}
        delete body.login
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it.each(['wrong', 'wrong@', '@wrong.ru', 'wrong@w.w.w'])(
        'when wrong email response should have status bad request',
        async (wrongEmail)=>{
          const body={...signUpDto, email: wrongEmail}
          await request(app.getHttpServer())
            .post('/auth/sign-up')
            .send(body)
            .expect(HttpStatus.BAD_REQUEST)
        })
      it('when short login response should have status bad request', async ()=>{
        const body={...signUpDto, login: 'Sandor2'}
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when long login response should have status bad request', async ()=>{
        const body={
          ...signUpDto,
          login: 'DaenerysStormbornUnburntQueenMeereenaQueenOfTheAndalsRhoynarAndTheFirstMenKhaleesiOfTheGreatSeaOfGrassShacklesbreakerMotherOfDragons'
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when short name response should have status bad request', async ()=>{
        const body={
          ...signUpDto,
          name: 'J'
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when long name response should have status bad request', async ()=>{
        const body={
          ...signUpDto,
          name: ''
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when short password response should have status bad request', async ()=>{
        const body={
          ...signUpDto,
          password: 'game'
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })
      it('when long password response should have status bad request', async ()=>{
        const body={
          ...signUpDto,
          password: 'wow'+ await bcrypt.hash('i', 10)
        }
        await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.BAD_REQUEST)
      })

    })

    // it('POST /sign-in/sign-in should detect that we are not logged in', async ()=>{
    //   await request(app.getHttpServer())
    //     .post('/auth/sign-in')
    //     .expect(HttpStatus.UNAUTHORIZED)
    // })
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
    await app.close()
  })
})
