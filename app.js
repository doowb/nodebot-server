'use strict';

var path = require('path');
var server = require('./');
server(path.join(__dirname, 'index.html'), function(err, app) {
  app.on('cmd', function(cmd) {
    console.log('emitted cmd:', cmd);
  });
});
