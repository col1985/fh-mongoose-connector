'use strict';

var testCfg = require('./config.js');
var model = require('./test-model.js');
var assert = require('assert');

describe(testCfg.label, function() {
  var Connector = require('./../lib/index');
  var connecter = null;
  var safeUri = '';
  // var Uri = '';
  var test = {};
  var testDb = {};

  before(function() {
    safeUri = testCfg.mongoURI;
    // badUri = testCfg.mongoURI;
    connecter = Connector;
  });

  it('should create connection to mongo', function(done) {
    connecter.connectToMongo(safeUri, {}, function(err, db) {
      if (err) {
        done(err);
      } else {
        testDb = db;
        done();
      }
    });
  });

  it('should get test db', function() {
    assert.notEqual(testDb, {});
  });

  it('connection object on connector should match test db', function() {
    assert.equal(connecter.connection, testDb);
  });

  it('should return connection config model', function(done) {
    connecter.getConfig(function(cfg) {
      console.log(cfg);
      done();
    });
  });

  it('should create model', function() {
    test = model(testDb);
    assert.notEqual(test, {});
  });

  it('should add test doc', function(done) {
    var doc = new test({
      title: 'test 1',
    });
    doc.save(function() {
      done();
    });
  });

  it('should close connection to mongo', function(done) {
    connecter.closeConnection();
    done();
  });
});