import {ConfigService}   from '@nestjs/config'
import {MongooseModule}  from '@nestjs/mongoose'
import inmemoryDatabase  from '../../test/database.inmemory'
import Env               from '../../test/env'
import {ConfigModule}    from '../config/config.module'
import {configConstants} from '../config/constants'

export const DatabaseModule=MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService)=>{
    if(configService.get(configConstants.env)===Env.ModuleTest){
      const mongoUri=await inmemoryDatabase.getConnectionString()
      return {uri: mongoUri}
    }
    const host=configService.get(configConstants.database.host)
    const port=configService.get(configConstants.database.port)
    const database=configService.get(configConstants.database.db)
    return {uri: `mongodb://${host}:${port}/${database}`}
  },
  inject: [ConfigService]
})
