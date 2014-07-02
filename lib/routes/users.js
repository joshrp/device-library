var Users		= require('models/users');

var Q = require('q');

module.exports = {
	getAll: function (req, res) {
		Users.getAll().then(function(users) {
				res.json(200, users);
		});
	},
	get: function(req,res) {
		Users.get(req.params['id'])
		.then(function(user) {
			res.json(200, device);
		});
	},
	delete: function(req,res) {
		Users.delete(req.params['id'])
		.then(function() {
			res.json(200);
		});
	},
	update: function(req,res) {
		Users.get(req.params['id'])
		.done(function(user) {
			user.attributes(req.params)
			.save()
			.then(function() {
				res.send(200);
			});
		})
		.catch(function() {
			res.send(404);			
		});
	}
}
