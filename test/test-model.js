'use strict';

var testCfg = require('./config.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
  id: ObjectId,
  modelType: {
    type: String,
    default: 'Test'
  },
  createdTs: {
    type: Date,
    default: new Date()
  },
  title: {
    type: String,
    default: testCfg.label
  },
  items: [{
    _id: false,
    item: {
      type: String,
      default: 'Some Item..'
    }
  }]
});

module.exports = function(db) {
  var model = db.model(testCfg.label, schema);
  return model;
};