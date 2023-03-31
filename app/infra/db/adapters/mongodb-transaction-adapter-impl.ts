import {TransactionAdapter} from 'app/core/ports/transaction-adapter'
import MongoDb from '@ioc:App/Database/Mongodb'

export class MongodbTransactionAdapterImpl implements TransactionAdapter {
  public async useTransaction <T = any> (callback: Function): Promise<T> {
    const session = await MongoDb.startSession()

    try {
      const result = await session.withTransaction(() => callback(session))
      return result as T
    } finally {
      await session.endSession()
    }
  }
}
