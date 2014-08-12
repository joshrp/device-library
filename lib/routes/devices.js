var devices = require('../models/devices');
var users		= require('../models/users');

var Q = require('q');
var uuid = require('node-uuid');

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
		var device,
			id = uuid.v4(),
			attrs = {
				id: id,
				name: req.body.name,
				OS: req.body.OS
			};

		// TODO: deviceValidator(device);
		device = devices.create(attrs);

		Q.ninvoke(device, 'save')
		.catch(function(err) {
			res.json(500, err);
		})
		.done(function() {
			res.setHeader('Location', ['/devices/', attrs.id].join(''));
			res.status(201);
			res.end();
		});
	},

	update: function(req, res) {
		var attrs = {
				name: req.body.name,
				OS: req.body.OS,
				owner: req.body.owner
			};

		Q.ninvoke(devices, 'findOne', {id: req.params['id']})
		.then(function(device) {
			for ( var key in attrs ) {
				if ( typeof attrs[key] !== 'undefined' ) {
					device.set(key, attrs[key]);
				}
			}

			return Q.ninvoke(device, 'save');
		})
		.catch(function(err) {
			res.json(500, err);
		})
		.done(function() {
			res.setHeader('Location', ['/devices/', attrs.id].join(''));
			res.status(201);
			res.end();
		});
	},

	delete: function(req, res) {
		Q.ninvoke(devices, 'findOne', {id: req.params['id']})
		.then(function(device) {
			return Q.ninvoke(device, 'destroy');
		})
		.catch(function(err) {
			res.json(500, err);
		})
		.done(function() {
			res.status(200);
			res.end();
		});
	},

		
}
