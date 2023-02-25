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
import { Socket } from 'socket.io'

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

  private constructor (private readonly socket: Socket) {}

  public registerGlobalEvents (): void {
    if (this.eventsRegistered) {
      return
    }

    Logger.info('Application Socket Events Registered!')
    Event.on('alert:realtime:broadcast:all', ({ type, message, title, icon, eventName }: Broadcast) => {
      this.socket.emit('alert', {
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

  public static getInstance (socket: Socket): ApplicationSocketEventsRegistry {
    if (!this.instance) {
      this.instance = new ApplicationSocketEventsRegistry(socket)
    }

    return this.instance
  }
}
