const YEAR = '2012';
const START = YEAR + '-01-01';
const END = YEAR + '-12-31';

var _ = require('lodash');

var percentChangeIndices = ['CNFRIMPY', 'CNTSICNY', 'GRBTIMMM', 'GRGDIMQ', 'GRIMP95M', 'GRIMP95Y', 'IDIMPTLY', 'IMP1CHNG', 'IMP1YOY%', 'INMTIMUY', 'JNTBIMPY', 'KOIMPTIM', 'KOIMPTIY', 'KOIMTOTY', 'UKGEIKLQ'];
var params = [];

_.forEach(percentChangeIndices, function(name) {
	params.push({
		TableName: YEAR,
	    KeyConditionExpression: '#t = :ticker and #d between :date1 and :date2',
	    ExpressionAttributeNames: {
			'#t': 'Ticker',
			'#d': 'Date'
	    },
	    ExpressionAttributeValues: {
			':ticker': name + ' Index',
			':date1': START,
			':date2': END
    	}
	});
});

module.exports = params;