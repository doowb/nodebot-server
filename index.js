'use strict';

var config = {};
var app = require('./server')(config);
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('cmd', function(cmd){
    console.log('cmd: ' + cmd);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
