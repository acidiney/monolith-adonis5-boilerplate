import { Socket } from 'socket.io'

let users: { userId, socketId, isRoot }[] = []

export default (socket: Socket) => {
  socket.emit('alert', {
    message: 'O Ernesto',
    title: 'Comeu pão',
    type: 'warning',
  })

  setTimeout(() => {
    users.filter(t => t.isRoot).forEach((user) => {
      socket.to(user.socketId).emit('alert', {
        message: '[Root]: Essa notificação só será recebida pelos roots',
        title: 'Nova notificação',
        type: 'success',
      })
    })
  }, 2000)

  socket.on('user-logged', (user) => {
    users.push({
      userId: user.userId,
      isRoot: user.isRoot,
      socketId: socket.id,
    })
  })

  socket.on('disconnect', () => {
    users = users.filter(u => u.socketId !== socket.id)
  })
}
