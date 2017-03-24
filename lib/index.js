'use strict';

var label = '[fh-mongoose] ';
var mongoose = require('mongoose');
var Promise = require('bluebird');

var handlers = {
  onError: function(err) {
    console.error(label, err.toString());
  },
  onConnection: function(uri) {
    console.info(label, 'Connected to Mongo @', uri);
  },
  onConnectionOpen: function() {
    console.info(label, 'Mongo connection open');
  },
  onClose: function() {
    console.info(label, 'Mongo connection closed');
  }
};

var Db = {};
Db.connection = {};

Db.connectToMongo = function(_uri, opts, cb) {

  // opts = opts || {
  //   keepAlive: true,
  //   poolSize: 10,
  //   connectTimeoutMS: 60000,
  //   promiseLibrary: Promise
  // };

  mongoose.connect(_uri);

  var _conn = mongoose.connection;

  _conn.mongoose = mongoose;
  _conn.once('open', function() {
    Db.connection = _conn;
    cb(null, _conn);
  }).on('error', function(error) {
    handlers.onError(error);
    cb(error, null);
  }).on('connected', function() {
    handlers.onConnection(_uri);
  });
};

Db.getConfig= function(cb) {
  var self = Db;
  self.connection.config;
  cb(self.connection.config);
};

Db.closeConnection= function() {
  var self = Db;
  self.connection.close(handlers.onClose);
};

module.exports = Db;