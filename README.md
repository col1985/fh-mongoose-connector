fh-mongoose-connector
====

[![Build Status](https://travis-ci.org/col1985/fh-mongoose-connector)](https://travis-ci.org/col1985/fh-mongoose-connector)

### how to use

#### require

```javascript
  var connector = require('fh-mongoose-connector');
```

#### connect

```javascript
  var uri = process.env.FH_MONGO_CONN_URL;

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

To Run tests, cloen down repo, ensure MongoDB is running locally or start mongo by running `mongod`.

```bash
  npm test
```