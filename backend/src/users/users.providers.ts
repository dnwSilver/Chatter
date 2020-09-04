import {Mongoose}                         from 'mongoose'
import {UserModel, UserSchema, UserTable} from './user.schema'

export const usersProviders=[
  {
    provide: UserModel,
    useFactory: (mongoose: Mongoose)=>mongoose.model(UserTable, UserSchema),
    inject: ['DATABASE_CONNECTION'] //todo remove hardcode there
  }
]
