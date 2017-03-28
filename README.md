fh-mongoose-connector
====

[![Build Status](https://travis-ci.org/col1985/fh-mongoose-connector.svg?branch=master)](https://travis-ci.org/col1985/fh-mongoose-connector)

### how to use

#### require

```javascript
  var connector = require('fh-mongoose-connector');
```

#### connect

```javascript
  var uri = process.env.FH_MONGO_CONN_URL || 'mongodb://loclahost:27017/FH_LOCAL';

  var opts = {
    keepAlive: true,
    poolSize: 10,
    connectTimeoutMS: 60000,
    promiseLibrary: require('bluebiard') // can be any promise lib
  };

  connecter.connectToMongo(uri, opts, function(err, db) {
    // do stuff
  });
```

#### getConfig
```javascript
  connecter.getConfig(function(cfg) {
    // do stuff
    console.log(cfg)
  });
```

#### disconnect
```javascript

  connecter.closeConnection();
```
### Test

To Run tests, clone repo, ensure MongoDB is running locally or start mongo by running `mongod`. And enter the following command.

```bash
  npm test
```