var sockets = {};

sockets.init = (server) => {
  var io = require('socket.io')(server);

  io.on('new_fcm_token', (socket) => {
    console.log(socket);
  })

  io.sockets.on('connection', function(socket) {
    console.log('A socket has connected');
  });
};

module.exports = sockets;