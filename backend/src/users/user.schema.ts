import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document}                    from 'mongoose'

@Schema()
export class User extends Document {
  @Prop()
  id: number

  @Prop({required: true})
  email: string

  @Prop({required: true, index: true, unique: true})
  login: string

  @Prop({required: true})
  name: string

  @Prop({required: true})
  password: string
}

export const UserSchema=SchemaFactory.createForClass(User)
