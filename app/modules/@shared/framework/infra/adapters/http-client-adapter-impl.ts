import axios, { AxiosInstance } from 'axios'
import { HttpClient } from '../../../usecases/ports/http-client'

export class HttpClientAdapterImpl implements HttpClient {
  private readonly _http: AxiosInstance

  constructor (private readonly baseURL: string) {
    this._http = axios.create({
      baseURL: this.baseURL,
      headers: {
        contentType: 'application/json',
      },
    })
  }

  public async retrieve<T>(params: any): Promise<T> {
    return this._http.get('/', {
      params,
    }).then((res) => {
      return res.data
    })
  }
}
