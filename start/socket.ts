import { ApplicationSocketEventsRegistry } from './application-socket-events-registry'
import { WsService } from 'app/infra/services/ws-service'

const ws = WsService.create()

ws.boot()

ws.io.on('connection', (socket) => {
  socket.on('connected', (user) => {
    socket.join(user.username)
  })

  const socketEventsRegistry = ApplicationSocketEventsRegistry.getInstance(socket)
  void socketEventsRegistry.registerGlobalEvents()
})

