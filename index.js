'use strict';

var Emitter = require('component-emitter');

module.exports = function(fp, cb) {
  var emitter = new Emitter();
  var app = require('./server')(fp);
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('cmd', function(cmd){
      console.log('cmd: ' + cmd);
      emitter.emit('cmd', cmd);
    });
  });

  http.listen(3000, function(){
    console.log('listening on *:3000');
    cb(null, emitter);
  });
};
