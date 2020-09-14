import {HttpStatus, INestApplication} from '@nestjs/common'
import * as bcrypt                    from 'bcrypt'
import * as request                   from 'supertest'
import {SignUpDto}                    from '../../src/auth/dto/sign-up.dto'
import {User}                         from '../../src/users/user.schema'
import inMemoryDatabase               from '../database.inmemory'
import appEnvironment                 from '../environments/app.environment'
import userEnvironment                from '../environments/user.environment'

describe('auth controller', ()=>{
  let app: INestApplication
  beforeAll(async ()=>{
    await inMemoryDatabase.start()
    app= await appEnvironment.setup()
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
      it('response should have status created', async ()=>{
        const body={
          email: 'Daeny@targaryen.com',
          login: 'MotherOfDragon',
          name: 'Daenerys',
          password: await bcrypt.hash('dracarys', 10)
        }
        const response=await request(app.getHttpServer())
          .post('/auth/sign-up')
          .send(body)
          .expect(HttpStatus.CREATED)

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).not.toBeUndefined()
        expect(response.body).not.toHaveProperty('password')

        const user: User=await userEnvironment.users.findOne({email: 'Daeny@targaryen.com'})
        expect(user.login).toBe('MotherOfDragon')
        expect(user.email).toBe('Daeny@targaryen.com')
        expect(user.name).toBe('Daenerys')
        expect(user.password).toHaveLength(60)
        expect(user._id).not.toBeUndefined()
        expect(user._id.toString()).toBe(response.body.id)
      })
      const signupDto: SignUpDto={
        email: 'Daeny@targaryen.com',
        login: 'MotherOfDragon',
        name: 'Daenerys',
        password: '$2b$10$KVZZbfZVNNN14oGlevEoH.ff.llu3x0rNlVV.vvlOezPVHPGbjSD6' // dracarys
      }
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
        await userEnvironment.addUser('Daeny@targaryen.com', 'Daeny')
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
    describe('when sign in', ()=>{
      it('when login and password correct response should be created', async ()=>{
        const password=await bcrypt.hash('TywinLannistersMadDog', 0)
        await userEnvironment.addUser('Gregor@clegane.io', 'mountain', 'Gregor', password)
        const body={email: 'Gregor@clegane.io', password: password}
        const response=await request(app.getHttpServer())
          .post('/auth/sign-in')
          .set('Accept', 'application/json')
          .send(body)
          .expect(HttpStatus.CREATED)

        expect(response.body).toHaveProperty('token')
        expect(response.body.token).not.toBeUndefined()
        expect(response.body).toHaveProperty('expirationTime')
        expect(response.body.expirationTime).not.toBeUndefined()
      })
      it('should be authorized', async ()=>{
        const password=await bcrypt.hash('TywinLannistersMadDog', 0)
        await userEnvironment.addUser('Gregor2@clegane.io', 'mountain2', 'Gregor', password)
        const body={email: 'Gregor2@clegane.io', password: password}
        const response1=await request(app.getHttpServer())
          .post('/auth/sign-in')
          .set('Accept', 'application/json')
          .send(body)
          .expect(HttpStatus.CREATED)

        expect(response1.body).toHaveProperty('token')
        expect(response1.body.token).not.toBeUndefined()
        const accessToken=response1.body.token

        // const accessToken=await appEnvironment.generateAccessToken(userEnvironment.currentUser)
        await request(app.getHttpServer())
          .get('/auth')
          .set('Cookie', `Authentication=${accessToken};HttpOnly;Path=/;Max-Age=${60}`)
          .expect(HttpStatus.OK)
      })
      it('disallow invalid credentials', async ()=>{
        const authInfo={username: 'wrong', password: 'bad'}
        await request(app.getHttpServer())
          .post('sign-in')
          .send(authInfo)
          .expect(HttpStatus.UNAUTHORIZED)
      })
    })
  })

  afterAll(async ()=>{
    await inMemoryDatabase.stop()
    await app.close()
  })
})
