var config = require('./main')({});

config.db.endpoint = 'http://localhost:8000';

module.exports = function(app) {
	return config;
};
