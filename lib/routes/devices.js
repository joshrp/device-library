var devices = require('../models/devices');
var users		= require('../models/users');

var Q = require('q');

module.exports = {
	getAll: function (req, res) {
		devices.getAll().then(function(devices) {
			var ownerPromises = [];

			devices.forEach(function(device) {
				if ( device.owner ) {
					ownerPromises.push(users.get(device.owner).then(function(user) {
						device.owner = user;			
					}));
				}
			});

			Q.allSettled(ownerPromises).then(function() {
				res.json(200, devices);
			});
		});
	},

	get: function(req,res) {
		devices.get(req.params['id'])
		.then(function(device) {
			if ( device.owner ) {
				users.get(device.owner).then(function(user) {
					device.owner = user;

					res.json(200, device);
				});
			} else {
				res.json(200, device);
			}
		});
	}	
}
