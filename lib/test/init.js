var app = require('../server');

before(function(done) {
  app.listen('test.sock', function () {
    console.log( "Listening on test.sock" );
    done();
  });
});

after(function() {
  app.close();
});
