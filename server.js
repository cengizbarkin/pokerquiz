const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = socketIO(server);


//Connecting User to the socketIO
io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.broadcast.emit('welcome');



  socket.on('deneme', (data) => {
    console.log('Deneme cagirildi');
    console.log(data);

    socket.emit('newMessage', data);
  });


});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
