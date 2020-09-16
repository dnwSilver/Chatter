import * as bcrypt         from 'bcrypt'
import {Collection}        from 'mongodb'
import {User}              from '../../src/users/user.schema'
import InMemoryMongoServer from '../database.inmemory'

const userCollectionName: string='users'

class UserEnvironment {
  public currentUser: User
  private usersCount: number=0

  public get users(): Collection<User> {
    return InMemoryMongoServer.database.collection(userCollectionName)
  }

  public async addUser({
                         email=undefined,
                         login=undefined,
                         name=undefined,
                         realPassword=undefined
                       }): Promise<User> {
    this.usersCount++
    const hashPassword=await bcrypt.hash(realPassword??'ValarMorghulis', 10)
    const user: User={
      email: email??`faceless${this.usersCount}@BlackWhiteHouse.su`,
      login: login??`faceless${this.usersCount}`,
      name: name??'Faceless',
      hashPassword: hashPassword
    }

    await InMemoryMongoServer.database.collection(userCollectionName).insertOne(user)
    return user
  }

}

export default new UserEnvironment()
