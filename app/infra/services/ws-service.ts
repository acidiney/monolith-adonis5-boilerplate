import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'
import Env from '@ioc:Adonis/Core/Env'
export class WsService {
  public io: Server
  private booted = false
  private static instance: WsService

  private constructor () {}

  public boot () {
    if (this.booted) {
      return
    }

    this.booted = true

    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: Env.get('APP_INTERNAL'),
      },
      transports: ['polling'],
    })
  }

  public static create () {
    if (!this.instance) {
      this.instance = new WsService()
    }

    return this.instance
  }
}
