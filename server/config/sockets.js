import { app } from '../index.js'
import http from 'http'
import { Server } from 'socket.io';

// configuring io and exporting it to be used in the order controller

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

export default io;