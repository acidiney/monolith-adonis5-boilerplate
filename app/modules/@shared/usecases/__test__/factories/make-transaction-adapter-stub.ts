import {TransactionAdapter} from 'app/core/ports'

export const makeTransactionAdapterStub = (): TransactionAdapter => {
  return new (class implements TransactionAdapter {
    public async useTransaction<T>(_callback: Function): Promise<T> {
      return Promise.resolve({} as T)
    }
  })()
}
