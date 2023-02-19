import { WsService } from 'app/infra/services/ws-service'
import { loadContext as context } from 'app/infra/utils'

import { resolve } from 'path'

const ws = WsService.create()

ws.boot()

ws.io.on('connection', (socket) => {
  ;['../app/modules'].forEach(async (path) => {
    const req = context(resolve(__dirname, path), true, /main\/socket\.(ts|js)$/)
    await req.keys().forEach(async (filename) => {
      const m = (await require(filename)).default
      void m(socket)
    })
  })
})
