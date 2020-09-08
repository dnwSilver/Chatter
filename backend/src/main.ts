import {ValidationPipe}         from '@nestjs/common'
import {ConfigService}          from '@nestjs/config'
import {NestFactory}            from '@nestjs/core'
import * as cookieParser        from 'cookie-parser'
import {AppModule}              from './app.module'
import {configConstants}        from './config/constants'
import {ExcludeNullInterceptor} from './interceptors/excludeNull.interceptor'

async function bootstrap() {
  const app=await NestFactory.create(AppModule)
  const configService=app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ExcludeNullInterceptor())
  app.use(cookieParser())
  await app.listen(configService.get('CHATTER_BACKEND_PORT'))
  console.log(`Application is running on: ${await app.getUrl()}`)
  console.log(`Database ${configService.get(configConstants.database.db)} is running on: ${configService.get(configConstants.database.host)}:${configService.get(configConstants.database.port)}`)
}

bootstrap()
