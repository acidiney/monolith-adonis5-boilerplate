import Env from '@ioc:Adonis/Core/Env'
import axios, { AxiosInstance } from 'axios'
import { HttpClient } from '../ports/http-client'

export class HttpClientAdapterImpl implements HttpClient {
  private readonly _http: AxiosInstance = axios.create({
    baseURL: Env.get('GITLAB_URL'),
    headers: {
      contentType: 'application/json',
    },
  })

  public async retrieve<T>(params: any): Promise<T> {
    return this._http.get('/', {
      params,
    }).then((res) => {
      return res.data
    })
  }
}
