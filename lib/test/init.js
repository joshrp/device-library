var app 		= require('../server'),
		Q				= require('q'),
		Users		= require('models/users'),
		Devices	= require('models/devices');

before(function(done) {
  app.listen('test.sock', function () {
    console.log( "Listening on test.sock" );
    done();
  });
});

after(function() {
  app.close();
});

beforeEach(function(done) {
	Q.all([
					Q.nfcall(Devices.schema.createTable),
					Q.nfcall(Users.schema.createTable)
	]).done(function(){ done() });
});

afterEach(function(done) {		
	Q.all([
					Q.nfcall(Devices.schema.deleteTable),
					Q.nfcall(Users.schema.deleteTable)
	]).done(function(){ done(); });
});
