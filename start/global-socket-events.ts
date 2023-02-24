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

let sessions: { username, socketId }[] = []

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

export const loadApplicationEvents = (socket: Socket) => {
  socket.on('connected', (user) => {
    sessions.push({
      username: user.username,
      socketId: socket.id,
    })
  })

  socket.on('disconnect', () => {
    sessions = sessions.filter(u => u.socketId !== socket.id)
  })

  Event.on('alert:realtime:broadcast:all', ({ type, message, title, icon, eventName }: Broadcast) => {
    socket.emit('alert', {
      title,
      message,
      type,
      icon,
      eventName,
    })
  })

  Event.on('alert:realtime:broadcast:only', ({ users, message, type, title, icon, eventName }: BroadcastOnly) => {
    sessions.filter(t => users.includes(t.username))
      .forEach((session) => {
        socket.to(session.socketId).emit('alert', {
          message,
          title,
          type,
          icon,
          eventName,
        })
      })
  })
}
