import {Module}        from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {FilesModule}   from '../files/files.module'
import User            from './user.entity'
import {UsersService}  from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    FilesModule
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {
}
