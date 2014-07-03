var devices = require('./devices'),
		users		= require('./users');

// Add bindings for all routes -> controllers
module.exports = function (app) {
	app.get('/devices', devices.getAll);
	app.get('/devices/:id', devices.get);
	app.post('/devices', devices.create);
	app.put('/devices/:id', devices.update);
	app.del('/devices/:id', devices.delete);

	/*app.get('/users', users.getAll);
	app.get('/users/:id', users.get);
	app.post('/users', users.create);
	app.put('/users/:id', users.put);
	app.delete('/users/:id', users.delete); */
}
