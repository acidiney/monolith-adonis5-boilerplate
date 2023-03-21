import Env from '@ioc:Adonis/Core/Env'
import MongoDb from '@ioc:App/Database/Mongodb'

export const CoreOutboxDatabase = MongoDb.query(Env.get('APP_NAME', 'orion'))
