'use strict';

var testCfg = require('./config.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

// var schema = new Schema({
//   id: ObjectId,
//   modelType: {
//     type: String,
//     default: 'Test'
//   },
//   createdTs: {
//     type: Date,
//     default: new Date()
//   },
//   title: {
//     type: String,
//     default: testCfg.label
//   },
//   items: [{
//     _id: false,
//     item: {
//       type: String,
//       default: 'Some Item..'
//     }
//   }]
// });

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var config = require('./../lib/config');
// var labels = config.modelLabels;

// common model scheam across results steps
var stepSchema = new Schema({
  _id: false,
  code: {
    type: String,
  },
  name: {
    type: String
  },
  templates: {
    form: {
      type: String
    },
    view: {
      type: String
    }
  }
});

// epod-arrival result schema
var epodArrivalSubmission = new Schema({
  timeOnSite: {
    type: String
  },
  arrivalLocation: [{
    type: Number
  }]
});

var epodArrivalSchema = new Schema({
  step: {
    type: [stepSchema]
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  submitter: {
    type: String
  },
  timestamp: {
    type: Date
  },
  submission: {
    type: epodArrivalSubmission
  }
});

// epod-discharge-start result schema
var epodDischargeStartedSubmission = new Schema({
  dischargeStartTime: {
    type: String
  },
  dischargeLocation: [{
    type: Number
  }]
});

var epodStartDischargeSchema = new Schema({
  step: {
    type: [stepSchema]
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  submitter: {
    type: String
  },
  timestamp: {
    type: Date
  },
  submission: {
    type: epodDischargeStartedSubmission
  }
});

// epod-finish-discharge result schema
var epodDischargeFinishedSubmission = new Schema({
  dischargeEndTime: {
    type: String
  }
});

var epodFinishDischargeSchema = new Schema({
  step: {
    type: [stepSchema]
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  submitter: {
    type: String
  },
  timestamp: {
    type: Date
  },
  submission: {
    type: epodDischargeFinishedSubmission
  }
});

// epod-confirm-additions result schema
var epodConfirmSubmission = new Schema({
  addedWater: {
    type: Number
  },
  returnedMaterial: {
    type: Number
  },
  reasonReturnedMaterial: {
    type: String
  },
  waitingTime: {
    type: Number
  }
});

var epodConfirmAdditionsSchema = new Schema({
  step: {
    type: stepSchema
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  submitter: {
    type: String
  },
  timestamp: {
    type: Date
  },
  submission: {
    type: epodConfirmSubmission
  }
});

// epod-summary-review result schema
var epodSummarySubmission = new Schema({
  comment: {
    type: String,
    default: 'Some Comment'
  }
});

var epodSummaryReviewSchema = new Schema({
  step: {
    type: stepSchema
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  submitter: {
    type: String
  },
  timestamp: {
    type: Date
  },
  submission: {
    type: epodSummarySubmission
  }
});

// epod-disclaimer-signoff result schema
var epodDisclaimerSubmission = new Schema({
  timeOffSite: {
    type: Date
  },
  hasReadDisclaimers: {
    type: Boolean
  },
  hasReadTerms: {
    type: Boolean
  },
  comments: {
    type: String
  },
  onBehalf: {
    type: String
  },
  signature: {
    type: String
  }
});

var epodDisclaimerSignoffSchema = new Schema({
  step: {
    type: stepSchema
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  submitter: {
    type: String
  },
  timestamp: {
    type: Date
  },
  submission: {
    type: epodDisclaimerSubmission
  }
});


var resultSchema = new Schema({
  status: {
    type: String
  },
  workorderId: {
    type: String
  },
  _localuid: {
    type: String
  },
  id: {
    type: String
  },
  // _id: {
  //   type: String
  // },
  stepResults: {
    'epod-arrival': {
      type: epodArrivalSchema
    },
    'epod-start-discharge': {
      type: epodStartDischargeSchema
    },
    'epod-finish-discharge': {
      type: epodFinishDischargeSchema
    },
    'epod-confirm-additions': {
      type: epodConfirmAdditionsSchema
    },
    'epod-summary-review': {
      type: epodSummaryReviewSchema
    },
    'epod-disclaimer-signoff': {
      type: epodDisclaimerSignoffSchema
    }
  }
});

module.exports = function(db) {
  var model = db.model('result', resultSchema);
  return model;
};

// module.exports = function(db) {
//   var model = db.model(testCfg.label, schema);
//   return model;
// };