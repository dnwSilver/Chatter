import {Db} from 'mongodb'

const {MongoClient}=require('mongodb')
const {MongoMemoryServer}=require('mongodb-memory-server')

const COLLECTIONS=[]

class InMemoryMongoServer {
  public database: Db=null
  private connection=null
  private server=new MongoMemoryServer()

  async start() {
    const url=await this.server.getConnectionString()
    const mongoose=require('mongoose')
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    this.connection= await MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    this.database=this.connection.db(await this.server.getDbName())
  }

  stop() {
    this.connection.close()
    return this.server.stop()
  }

  async connectionString() {
    return await this.server.getConnectionString()
  }

  cleanup() {
    return Promise.all(COLLECTIONS.map(c=>this.database.collection(c).remove({})))
  }
}

export default new InMemoryMongoServer()
