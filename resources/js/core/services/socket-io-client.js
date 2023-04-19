import { io } from 'socket.io-client'

class SocketioService {
  socket
  constructor () {}

  setupSocketConnection () {
    this.socket = io()
  }

  disconnect () {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export default new SocketioService()
