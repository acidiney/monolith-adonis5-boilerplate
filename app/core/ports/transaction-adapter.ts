export interface TransactionAdapter {
  useTransaction: <T>(callback: Function) => Promise<T>
}
