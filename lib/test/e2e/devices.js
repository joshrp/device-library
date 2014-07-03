var restify = require('restify');

var client = restify.createJsonClient({
  socketPath: 'test.sock'
});

describe('/devices Routing', function () {
	describe('GET /devices', function () {
		it('should ask the model for all devices', function (done) {
      client.get('/devices', function(err, req, res, obj) {
			  obj.should.equal([])
        done()
      });
		})
	});

  describe('GET /devices/0', function() {
    it('should return 404 as no device is present', function (done) {
      client.get('/devices/0', function(err, req, res, obj) {
        res.statusCode.should.equal(404)
        done()
      });
    })
  });

  describe('POST /devices', function() {
    it('should create a new device resource and return its location', function(done) {
      client.post('/devices', {name:'woof'}, function(err, req, res, obj) {
        res.statusCode.should.equal(201);
        res.headers.should.have.property('Location');
        console.log(res.headers);
        done();
      });
    });
  });

  describe('PUT /devices/0', function() {
    it('should create a new device resource at a specified uri', function(done) {
      client.put('/devices/0', {name:'woof'}, function(err, req, res, obj) {
        res.statusCode.should.equal(200);
        done();
      });
    });
  });
})
