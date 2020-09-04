import {TypeOrmModule}     from '@nestjs/typeorm'
import {MongoMemoryServer} from 'mongodb-memory-server'

const mongod=new MongoMemoryServer()

const DatabaseInMemoryModule=TypeOrmModule.forRootAsync({
  useFactory: async ()=>{
    const port=await mongod.getPort()
    const database=await mongod.getDbName()

    return {
      name: 'dsadahj',
      type: 'mongodb',
      host: '127.0.0.1',
      port,
      database,
      entities: [__dirname+'/**/*.entity{.ts,.js}']
    }
  }
})
export default DatabaseInMemoryModule
