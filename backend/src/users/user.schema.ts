import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Exclude}                     from 'class-transformer'
import {Document}                    from 'mongoose'

@Schema()
export class User extends Document {
  @Prop({required: true})
  email: string

  @Prop({required: true, index: true, unique: true})
  login: string

  @Prop({required: true})
  name: string

  @Exclude()
  @Prop({required: true})
  password: string
}

export const UserSchema=SchemaFactory.createForClass(User)
