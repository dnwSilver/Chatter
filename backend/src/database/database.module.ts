import {Module}                      from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule}               from '@nestjs/typeorm'
import {configConstants}             from '../config/constants'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>({
        type: 'mongodb',
        host: configService.get(configConstants.database.host),
        port: configService.get(configConstants.database.port),
        database: configService.get(configConstants.database.db),
        entities: [
          __dirname+'/../**/*.entity{.ts,.js}'
        ],
        synchronize: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    })
  ]
})
export class DatabaseModule {
}
