/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Event from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'

import { resolve } from 'path'
import { Socket, Server } from 'socket.io'
import { loadContext as context } from 'app/infra/utils'

export interface Broadcast {
  message: string,
  type: 'success' | 'info' | 'error' | 'warning',
  icon?: string
  title: string,
  eventName: string
}

export interface BroadcastOnly extends Broadcast {
  users: string[]
}

export class ApplicationSocketEventsRegistry {
  private static instance: ApplicationSocketEventsRegistry
  private eventsRegistered: boolean = false

  private constructor (
    private readonly socket: Socket,
    private readonly sockets: any
  ) {}

  public registerGlobalEvents (): void {
    if (this.eventsRegistered) {
      return
    }

    Logger.info('Application Socket Events Registered!')

    ;['../app/modules'].forEach(async (path) => {
      const req = context(resolve(__dirname, path), true, /main\/socket\.(ts|js)$/)
      for (const filename of req.keys()) {
        const m = (await require(filename)).default
        void m(this.socket)
      }
    })

    Event.on('alert:realtime:broadcast:all', ({ type, message, title, icon, eventName }: Broadcast) => {
      this.sockets.emit('alert', {
        title,
        message,
        type,
        icon,
        eventName,
      })
    })

    Event.on('alert:realtime:broadcast:only', ({ users, message, type, title, icon, eventName }: BroadcastOnly) => {
      users
        .forEach((username) => {
          this.socket.to(username).emit('alert', {
            message,
            title,
            type,
            icon,
            eventName,
          })
        })
    })

    this.eventsRegistered = true
  }

  public static getInstance (socket: Socket, sockets: any): ApplicationSocketEventsRegistry {
    if (!this.instance) {
      this.instance = new ApplicationSocketEventsRegistry(socket, sockets)
    }

    return this.instance
  }
}
