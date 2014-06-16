var devices = require('../models/devices');

module.exports = {
	getAll: function (req, res) {
		res.send(devices.getAll());
	}	
}