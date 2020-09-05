import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel}                           from '@nestjs/mongoose'
import {Model}                                 from 'mongoose'
import {UserCreateDto}                         from './user.create.dto'
import {User}                                  from './user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
    // private readonly filesService: FilesService
  ) {
  }

  async getByEmail(email: string): Promise<User> {
    const user=await this.userModel.findOne({email: email}).exec()
    if(user){
      return user
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND)
  }

  async getById(id: number) {
    const user=await this.userModel.findOne({id: id}).exec()
    if(user){
      return user
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
  }

  async create(userCreateDto: UserCreateDto): Promise<User> {
    const createdUser=new this.userModel(userCreateDto)
    await createdUser.save()
    return createdUser
  }

  // async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
  //   const user=await this.getById(userId)
  //   if(user.avatar){
  //     await this.usersRepository.update(userId, {
  //       ...user,
  //       avatar: null
  //     })
  //     await this.filesService.deleteFile(user.avatar.id)
  //   }
  //   const avatar=await this.filesService.uploadFile(imageBuffer, filename)
  //   await this.usersRepository.update(userId, {
  //     ...user,
  //     avatar
  //   })
  //   return avatar
  // }
  //
  // async deleteAvatar(userId: number) {
  //   const user=await this.getById(userId)
  //   const fileId=user.avatar?.id
  //   if(fileId){
  //     await this.usersRepository.update(userId, {
  //       ...user,
  //       avatar: null
  //     })
  //     await this.filesService.deleteFile(fileId)
  //   }
  // }

}
