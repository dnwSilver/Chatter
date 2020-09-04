import {Module}          from '@nestjs/common'
import {ConfigService}   from '@nestjs/config'
import {MongooseModule}  from '@nestjs/mongoose'
import {AuthModule}      from './auth/auth.module'
import {ConfigModule}    from './config/config.module'
import {configConstants} from './config/constants'
import {UsersModule}     from './users/users.module'

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService)=>{
        const host=configService.get(configConstants.database.host)
        const port=configService.get(configConstants.database.port)
        const database=configService.get(configConstants.database.db)
        return {uri: `mongodb://${host}:${port}/${database}`}
      },
      inject: [ConfigService]
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
