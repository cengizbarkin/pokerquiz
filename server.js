const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = socketIO(server);

//Different namespaces for user to connect games
const silver = io.of('/silver');
const golden = io.of('/golden');
const diamond = io.of('/diamond');


silver.on('connection', (socket) => {
  console.log('Silver a birisi bağlandı');
});


golden.on('connection', (socket) => {
  console.log('Golden a birisi bağlandı');
});


diamond.on('connection', (socket) => {
  console.log('diamond a birisi bağlandı');
});



//Connecting User to the socketIO
io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.broadcast.emit('welcome');
  socket.emit('message', 'Server', 'Hos Geldiniz');


  socket.on('deneme', (data) => {
    console.log('Deneme cagirildi');
    console.log(data);
    socket.broadcast.emit('newMessage', data);
  });


});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
