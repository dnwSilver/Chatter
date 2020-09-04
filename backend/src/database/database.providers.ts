import {ConfigService}   from '@nestjs/config'
import * as mongoose     from 'mongoose'
import {ConfigModule}    from '../config/config.module'
import {configConstants} from '../config/constants'

export const DatabaseConnection='DATABASE_CONNECTION'

export const databaseProviders=[
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: DatabaseConnection,
    export: DatabaseConnection,
    useFactory: async (configService: ConfigService): Promise<typeof mongoose>=>{
      const host=configService.get(configConstants.database.host)
      const port=configService.get(configConstants.database.port)
      const database=configService.get(configConstants.database.db)
      await mongoose.connect(`mongodb://${host}:${port}/${database}`)
    }
  }
]

