import {ApplicationContract} from '@ioc:Adonis/Core/Application'
import Logger from '@ioc:Adonis/Core/Logger'
export default class MongodbProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    this.app.container.singleton('App/Database/Mongodb', () => {
      const Env = this.app.container.use('Adonis/Core/Env')
      const {MongoDb} = require('./MongoDb')

      return new MongoDb(Env.get('MONGODB_URL'))
    })
  }

  public async boot () {
    // IoC container is ready
    const database = this.app.container.use('App/Database/Mongodb')

    await database.connect()
      .then(() => {
        Logger.info('Mongodb connected!')
      })
  }

  public async shutdown () {
    const database = this.app.container.use('App/Database/Mongodb')

    await database.disconnect()
  }
}
