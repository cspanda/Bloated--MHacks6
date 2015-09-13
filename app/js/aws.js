const AWS_ACCESS_KEY_ID = 'AKIAIZCV7FRA7RDC57HQ';
const AWS_SECRET_ACCESS_KEY = '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';
const AWS_REGION = 'us-east-1';

var _ = require('lodash');
var aws = require('aws-sdk');
var myFirebaseRef = require('./firebase.js');
var metricTonnesIndexNamesImport = require('./IndexNames/metricTonnesImport.js');
var metricTonnesIndexNamesExport = require('./IndexNames/metricTonnesExport.js');
var percentChangeIndexNamesImport = require('./IndexNames/percentChangeImport.js');
var percentChangeIndexNamesExport = require('./IndexNames/percentChangeExport.js');
var dollarIndexNamesImport = require('./IndexNames/dollarsImport.js');
var dollarIndexNamesExport = require('./IndexNames/dollarsExport.js');

aws.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});
var db = new aws.DynamoDB.DocumentClient();

var metricTonnesRefImport = myFirebaseRef.child("import tonnes");
var metricTonnesRefExport = myFirebaseRef.child("export tonnes");
var percentChangeRefImport = myFirebaseRef.child("import percent");
var percentChangeRefExport = myFirebaseRef.child("export percent");
var dollarsRefImport = myFirebaseRef.child("import dollars");
var dollarsRefExport = myFirebaseRef.child("export dollars");

var tonnesIndexImport = 0;
var tonnesIndexExport = 0;
var percentIndexImport = 0;
var percentIndexExport = 0;
var dollarsIndexImport = 0;
var dollarsIndexExport = 0;

_.forEach(metricTonnesIndexNamesImport, function(obj) {
  for( var i=0; i<4; i++){
	db.query(obj[i], function(err, data) {
	    if (err)
			console.log(err, err.stack);
	    else {
			console.log(data);
			metricTonnesRefImport.child("Index: " + tonnesIndexImport).set(data);
	    }
	    tonnesIndexImport++;
	});
}
});

_.forEach(metricTonnesIndexNamesExport, function(obj) {
  for (var i=0; i<16; i++){
	db.query(obj[i], function(err, data) {
	    if (err)
			console.log(err, err.stack);
	    else {
			console.log(data);
			metricTonnesRefExport.child("Index: " + tonnesIndexExport).set(data);
	    }
	    tonnesIndexExport++;
	});
}
});

_.forEach(percentChangeIndexNamesImport, function(obj) {
  for(var i=0; i<15; i++){
	db.query(obj[i], function(err, data) {
	    if (err)
			console.log(err, err.stack);
	    else {
			console.log(data);
			percentChangeRefImport.child("Index: " + percentIndexImport).set(data);
	    }
	    percentIndexImport++;
	});
}
});

_.forEach(percentChangeIndexNamesExport, function(obj) {
  for(var i=0; i<12;i++){
  db.query(obj[i], function(err, data) {
	    if (err)
			console.log(err, err.stack);
	    else {
			console.log(data);
			percentChangeRefExport.child("Index: " + percentIndexExport).set(data);
	    }
	    percentIndexExport++;
	});
}
});

_.forEach(dollarIndexNamesImport, function(obj) {
  for(var i=0; i<3; i++)
  {
    db.query(obj[i], function(err, data) {
      if (err)
        console.log(err, err.stack);
      else {
        console.log(data);
        dollarsRefImport.child("Index: " + dollarsIndexImport).set(data);
      }
      dollarsIndexImport++;
    });
  }
});

_.forEach(dollarIndexNamesExport, function(obj) {
  for(var i=0; i<3; i++){
	db.query(obj[i], function(err, data) {
	    if (err)
			console.log(err, err.stack);
	    else {
			console.log(data);
			dollarsRefExport.child("Index: " + dollarsIndexExport).set(data);
	    }
	    dollarsIndexExport++;
	});
}
});
