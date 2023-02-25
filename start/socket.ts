import { resolve } from 'path'

import { ApplicationSocketEventsRegistry } from './application-socket-events-registry'
import { WsService } from 'app/infra/services/ws-service'
import { loadContext as context } from 'app/infra/utils'

const ws = WsService.create()

ws.boot()

ws.io.on('connection', (socket) => {
  ;['../app/modules'].forEach(async (path) => {
    const req = context(resolve(__dirname, path), true, /main\/socket\.(ts|js)$/)
    for (const filename of req.keys()) {
      const m = (await require(filename)).default
      void m(socket)
    }
  })

  socket.on('connected', (user) => {
    socket.join(user.username)
  })

  const socketEventsRegistry = ApplicationSocketEventsRegistry.getInstance(socket)

  void socketEventsRegistry.registerGlobalEvents()
})

