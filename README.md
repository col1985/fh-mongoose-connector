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
  connecter.connectToMongo(uri, function(err, db) {
    // do stuff
  });
```

#### getConfig
```javascript
  var uri = process.env.FH_MONGO_CONN_URL;
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

Run tests

```bash
npm test
```