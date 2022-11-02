import { Server } from "socket.io";

const server = new Server(4446, {
  cors: {
    origin: true
  }
})

const db = server.of('/db')

db.on('connect', (socket) => {
  console.log('db connected')
  socket.on('hello', (arg, cb) => {
    setTimeout(() => {
      cb(`${arg} some data`)
    }, 1000);
  })
})