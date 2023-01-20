import { UniqueEntityID } from '../domain'

export interface Auth {
  userId?: UniqueEntityID
  authenticate: (username: string, password: string) => Promise<any>
  logout: () => Promise<any>
}

export interface Input<Body> {
  auth?: Auth
  body: Body
}

export interface Output<Body> {
  statusCode: number
  body: Body
}
