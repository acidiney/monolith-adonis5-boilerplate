import MongoDb from '@ioc:App/Database/Mongodb'

export const CoreOutboxDatabase = MongoDb.query('CoreOutbox')
