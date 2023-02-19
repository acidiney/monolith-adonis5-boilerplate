export default (socket) => {
  socket.emit('alert', {
    type: 'success',
    title: '[Sistema] Nova Release',
    message: 'Foi adicionado o socket.io, para comunicações em tempo real ❤️',
  })

  setTimeout(() => {
    socket.emit('alert', {
      type: 'warning',
      title: '[Sistema] Nova Release',
      message: `O socket.io foi implementado de forma modular também,
      e agora faz parte do contrado de uso do boilerplate!`,
    })
  }, 1000)
}
