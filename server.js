'use strict';

var path = require('path');
var express = require('express');
var extend = require('extend-shallow');

module.exports = function(config) {
  config = extend({
    cwd: process.cwd(),
    index: 'index.html'
  }, config);

  var app = express();
  app.use(express.static(config.cwd));

  app.get('/', function(req, res){
    res.sendFile(path.join(config.cwd, config.index));
  });

  return app;
};
