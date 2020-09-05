import * as Joi    from '@hapi/joi'
import {Module}    from '@nestjs/common'
import * as config from '@nestjs/config'

@Module({
  imports: [
    config.ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        CHATTER_ENV: Joi.string().required(),
        CHATTER_MONGO_HOST: Joi.string().required(),
        CHATTER_MONGO_PORT: Joi.number().required(),
        CHATTER_MONGO_DB: Joi.string().required(),
        CHATTER_JWT_SECRET: Joi.string().required(),
        CHATTER_JWT_EXPIRATION_TIME: Joi.string().required(),
        CHATTER_BACKEND_PORT: Joi.number()
      })
    })
  ]
})
export class ConfigModule {
}
