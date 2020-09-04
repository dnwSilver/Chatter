import {Injectable} from '@nestjs/common'

@Injectable()
export class FilesService {
  // constructor(
  //   @InjectRepository(File)
  //   private readonly filesRepository: Repository<File>
  // ) {
  // }
  //
  // async uploadFile(dataBuffer: Buffer, filename: string) {
  //   // todo upload file to file storage
  //
  //   const newFile=this.filesRepository.create({
  //     key: 'sadasdasddas',
  //     url: '/asd'
  //   })
  //   await this.filesRepository.save(newFile)
  //   return newFile
  // }
  //
  // async deleteFile(fileId: number) {
  //   const file: File=await this.filesRepository.findOne({id: fileId})
  //   // todo delete file from file storage
  //   await this.filesRepository.delete(fileId)
  // }
}
