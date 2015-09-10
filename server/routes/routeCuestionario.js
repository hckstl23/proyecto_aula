/**
 * Created by hckstl on 6/10/15.
 */
var io;
exports.iniciar = function(http){
  io = require('socket.io').listen(http);
  io.sockets.on('connection', function(socket){
    socket.emit('mensaje', {text: 'Bienvenido.'});
    socket.broadcast.emit('mensaje', {text: 'Un nuevo usuario se ha conectado.'});
    socket.on('disconnect', function(){
      socket.broadcast.emit('mensaje', {text: 'Un usuario se ha desconectado.'});
    });
  });
};
