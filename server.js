'use strict';

var path = require('path');
var express = require('express');

module.exports = function(config) {
  var app = express();
  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  return app;
};
