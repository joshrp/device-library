var devices = require('../models/devices');
var users		= require('../models/users');

var Q = require('q');

module.exports = {
	getAll: function (req, res) {
		Q.ninvoke(devices,'find').then(function(devices) {
			var ownerPromises = [];

			devices.forEach(function(device) {
				if ( device.owner ) {
					var promise = Q.ninvoke(users, 'findOne', {id:device.owner});
					promise.then(function(user) {
							device.owner = user;
					});
					ownerPromises.push(promise);
				}
			});

			Q.all(ownerPromises).then(function() {
				res.json(200, devices);
			});
		});
	},

	get: function(req,res) {
		Q.ninvoke(devices, 'findOne', {id: req.params['id']})
		.done(function(device) {
			if ( device.owner ) {
				Q.ninvoke(users, 'findOne', {id: device.owner}).done(function(user) {
					device.owner = user;

					res.json(200, device);
				});
			} else {
				res.json(200, device);
			}
		});
	},

	create: function(req, res) {
					res.json(200);
	},

	update: function(req, res) {
					res.json(200);
	},

	delete: function(req, res) {
					res.json(200);
	},

		
}
