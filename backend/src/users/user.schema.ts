import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Exclude}                     from 'class-transformer'
import {Document}                    from 'mongoose'
import toJSON                        from '../database/toJson'

@Schema()
export class User extends Document {
  _id?: string

  @Prop({required: true})
  email: string

  @Prop({required: true, index: true, unique: true})
  login: string

  @Prop({required: true})
  name: string

  @Exclude()
  @Prop({required: true})
  hashPassword: string
}

export const UserSchema=SchemaFactory.createForClass(User).method('toJSON', toJSON)


