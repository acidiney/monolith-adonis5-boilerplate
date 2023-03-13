import {Db, MongoClient} from 'mongodb'
import {Exception} from '@poppinss/utils'

export class MongoDb {
  private readonly client: MongoClient
  private isConnected = false
  constructor (
    private readonly url: string
  ) {
    this.client = new MongoClient(this.url)
  }

  public async connect (): Promise<void> {
    if (this.isConnected) {
      return
    }

    await this.client.connect()
    this.isConnected = true
  }

  public query (dbName: string): Db {
    if (!this.isConnected) {
      throw new Exception('MongoDb is not connected!')
    }

    return this.client.db(dbName)
  }

  public async disconnect (): Promise<void> {
    if(!this.isConnected) {
      return
    }

    await this.client.close()
  }
}
