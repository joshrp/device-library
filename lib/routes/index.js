var devices = require('./devices');

// Add bindings for all routes -> controllers
module.exports = function (app) {
	app.get('/devices', function (req, res) {
		devices.getAll(req, res);
	});

	app.put('/devices', function (req, res) {
		
	})
}