var YEAR = '2005';//whenever you want your start date to be, mindful of gaps in data->errors


var _ = require('lodash');
var yearsNeeded= 9;//Hardcoded here, but obviously do a simple subtraction thing for the web app. currentyear-year they want.
var params = new Array (yearsNeeded);//1d array
for( var i=0; i<yearsNeeded; i++)//making the array 2d
{
	params[i]= new Array();
}


var dollarIndices = ['BZTBEXPM', 'CNFRBAL$', 'RUTBEX'];

for(var i=0; i<yearsNeeded; i++)//iterating through the years.
{

	var START = YEAR + '-01-01';
	var END = YEAR + '-12-31';
		_.forEach(dollarIndices, function(name) {//pushes into that year in sequence.
			params[i].push({
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
		YEAR = (Number(YEAR) + 1).toString();//increment
}
module.exports = params;
