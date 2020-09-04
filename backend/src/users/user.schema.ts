import * as mongoose from 'mongoose'

export const UserModel='USER_MODEL'
export const UserTable='User'
export const UserSchema=new mongoose.Schema({
  id: Number,
  email: String,
  login: String,
  name: String,
  password: String
})
