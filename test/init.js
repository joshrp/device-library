var app				= require('server'),
		Q					= require('q'),
		dynalite	= require('dynalite')(),
		Users			= require('models/users'),
		Devices		= require('models/devices');

before(function() {
	return Q.allSettled([
		Q.ninvoke(dynalite, 'listen', 8000),
		Q.ninvoke(app, 'listen', 'test.sock')
	]);
});

after(function() {
	return Q.allSettled([
		Q.ninvoke(dynalite, 'close'),
		Q.ninvoke(app, 'close')
	]);
});

beforeEach(function() {
	return Q.allSettled([
		Q.ninvoke(Devices.schema, 'createTable'),
		Q.ninvoke(Users.schema,   'createTable')
	]);
});

afterEach(function() {
	return Q.allSettled([
		Q.ninvoke(Devices.schema, 'deleteTable'),
		Q.ninvoke(Users.schema,   'deleteTable')
	]);
});
