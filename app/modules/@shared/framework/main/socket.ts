export default (socket) => {
  socket.emit('alert', {
    type: 'info',
    title: 'new.user.connected',
    message: 'new.user.connected.on.other.pc',
  })
}
