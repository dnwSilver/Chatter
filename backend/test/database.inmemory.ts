const {MongoClient}=require('mongodb')
const {MongoMemoryServer}=require('mongodb-memory-server')

jest.setTimeout(60000)

const COLLECTIONS=[]

class InMemoryDatabase {
  private connection=null
  private db=null
  private server=new MongoMemoryServer()

  async start() {
    const url=await this.server.getConnectionString()
    this.connection= await MongoClient.connect(url, {useNewUrlParser: true})
    this.db=this.connection.db(await this.server.getDbName())
  }

  stop() {
    this.connection.close()
    return this.server.stop()
  }

  async getConnectionString() {
    return await this.server.getConnectionString()
  }

  cleanup() {
    return Promise.all(COLLECTIONS.map(c=>this.db.collection(c).remove({})))
  }
}

export default new InMemoryDatabase()
