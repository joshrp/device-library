var AWS = require('aws-sdk');
module.exports = function (app) {
	return {
		port: 1234,
		db: {
			endpoint: new AWS.EndPpoint('http://localhost:8000')
		}
	}
}
