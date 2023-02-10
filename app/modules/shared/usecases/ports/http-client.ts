export interface HttpClient {
  retrieve<T>(params?: any): Promise<T>
}
