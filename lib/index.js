'use strict';

var mongoose = require('mongoose');

function _isMongoUri(uri) {
  return (uri.indexOf('monogodb://') !== -1);
}

function _onError(err) {
  console.error('Error: connecting to mongo, ', err.toString());
}

function _onConnect(uri) {
  console.info('Connected to mongo @: ', uri);
}

function _onDisconnect() {
  console.info('Disconnect successfully from mongo');
}

function _onClose() {
  console.info('mongo connection closed');
}

mongoose.connection.once('open', _onConnect);
mongoose.connection.on('disconnect', _onDisconnect);
mongoose.connection.on('close', _onClose);

function connect(uri) {
  if (!_isMongoUri(uri)) {
    throw new Error('Not a valid mongo connection string');
  } else {
    var connection = {};
    mongoose.connect(uri, function(error) {
      if (error) {
        _onError(error);
      } else {
        connection = mongoose.connection;
      }
    });
    return connection;
  }
}

function disconnect() {
  mongoose.disconnect(function() {
    console.info('Disconnected from mongo');
  });
}

module.exports = {
  connect: connect,
  disconnect: disconnect
};


