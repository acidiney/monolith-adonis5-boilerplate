/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import {Socket} from 'socket.io'
import Event from '@ioc:Adonis/Core/Event'

let sessions: { userId, socketId }[] = []

interface Broadcast {
  message: string,
  type: 'success' | 'info' | 'danger' | 'warning',
  icon?: string
  title: string
}

interface BroadcastOnly extends Broadcast {
  users: { id: string }[]
}

export const loadApplicationEvents = (socket: Socket) => {
  Event.on('alert:realtime:broadcast:all', ({ type, message, title, icon }: Broadcast) => {
    socket.emit('alert', {
      title,
      message,
      type,
      icon,
    })
  })

  Event.on('alert:realtime:broadcast:only', ({ users, message, type, title, icon }: BroadcastOnly) => {
    sessions.filter(t => users.includes(t.userId)).forEach((user) => {
      socket.to(user.socketId).emit('alert', {
        message,
        title,
        type,
        icon,
      })
    })
  })
}
