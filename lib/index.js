'use strict';

var handlers = {
  onError: function(err) {
    console.error(err.toString());
  },
  onConnection: function(uri) {
    console.info('Connected to mongo @: ', uri);
  },
  onConnectionOpen: function() {
    console.info('Mongo connection open');
  },
  onClose: function() {
    console.info('mongo connection closed');
  }
};

var DB = function() {};
var mongoose = require('mongoose');

DB.prototype.connectToMongo = function(_uri, cb) {
  mongoose.connect(_uri);
  var _conn = mongoose.connection;
  _conn.mongoose = mongoose;

  _conn.once('open', function() {
    // _self.setDb(_conn);
    cb(null, _conn);
  }).on('error', function(error) {
    handlers.onError(error);
    cb(error, null);
  }).on('connected', function() {
    handlers.onConnection(_uri);
  });
};

module.exports = DB;