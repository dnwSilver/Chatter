import * as bcrypt         from 'bcrypt'
import {Collection}        from 'mongodb'
import {User}              from '../../src/users/user.schema'
import InMemoryMongoServer from '../database.inmemory'

const userCollectionName: string='users'

class UserEnvironment {
  public currentUser: User

  public get users(): Collection<User> {
    return InMemoryMongoServer.database.collection(userCollectionName)
  }

  public async setup() {
    this.currentUser= await this.addUser()
  }

  public async addUser(
    email: string=undefined,
    login: string=undefined,
    name: string=undefined,
    realPassword: string=undefined): Promise<User> {
    const hashPassword=await bcrypt.hash(realPassword??'YouDontNothing', 10)
    const user: User={
      email: email??'john@snow.com',
      login: login??'john89',
      name: name??'John',
      hashPassword: hashPassword
    }

    await InMemoryMongoServer.database.collection(userCollectionName).insertOne(user)
    return user
  }

}

export default new UserEnvironment()
