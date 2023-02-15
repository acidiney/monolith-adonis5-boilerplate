import {TransactionAdapter} from 'app/core/ports/transaction-adapter'
import Database from '@ioc:Adonis/Lucid/Database'

export class TransactionAdapterImpl implements TransactionAdapter {
  public async useTransaction <T = any> (callback: Function): Promise<T> {
    const trx = await Database.transaction()

    try {
      const output = await callback(trx)

      await trx.commit()
      return output
    } catch (e) {
      await trx.rollback()

      throw e
    }
  }
}
