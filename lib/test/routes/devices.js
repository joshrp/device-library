var sinon		= require('sinon');
var Q				= require('q');

var Faker 	= require('faker');
var Devices = require('models/devices');
var Users 	= require('models/users');

var DeviceController = require('routes/devices.js');

describe('Device model', function() {
	// Stub out user dependancy
	before(function() {
		sinon.stub(Users, 'get', function(id) {
				var defer = Q.defer();
				defer.resolve({
					id: id
				});				
				return defer.promise;
		});
	});

	it('will include a user in the response based on the owner field', function(done) {
		var device = Faker.Helpers.randomNumber(404);
		var owner = Faker.Helpers.randomNumber(404);
		var stub = sinon.stub(Devices, 'get', function(id) {
			var defer = Q.defer();
			defer.resolve({
				id: id,
				owner: owner 
			});
			return defer.promise;
		});

		var req = {
			params:{id:device}
		};

		var res = {
			json: function(code, data) {
				try {
					code.should.eql(200);
					data.should.eql({
						id: device,
						owner: {
							id: owner
						}
					});

					stub.restore();
					done();
				} catch(e) {
					done(e);
				}
			}
		};

		DeviceController.get(req, res);
	});

  it('will not include a user in the response based on the owner field', function(done) {
    var device = Faker.Helpers.randomNumber(404);
    var owner = Faker.Helpers.randomNumber(404);
    var stub = sinon.stub(Devices, 'get', function(id) {
      var defer = Q.defer();
      defer.resolve({
        id: id,
        owner: null
      });
      return defer.promise;
    });

    var req = {
      params:{id:device}
    };

    var res = {
      json: function(code, data) {
        try {
          code.should.eql(200);
          data.should.eql({
            id: device,
            owner: null
          });

          stub.restore();
          done();
        } catch(e) {
          done(e);
        }
      }
    };

    DeviceController.get(req, res);
  });

  it('will include multiple users based on multiple devices', function(done) {
    var devices = [Faker.Helpers.randomNumber(404), Faker.Helpers.randomNumber(404), Faker.Helpers.randomNumber(404)];
    var owners = [Faker.Helpers.randomNumber(404), Faker.Helpers.randomNumber(404)];
    var stub = sinon.stub(Devices, 'getAll', function() {
      var defer = Q.defer();
      defer.resolve([{
        id: devices[0],
        owner: owners[0]
      }, {
				id: devices[1],
				owner: null
			}, {
				id: devices[2],
				owner: owners[1]
			}]);
      return defer.promise;
    });

    var req = {};

    var res = {
      json: function(code, data) {
        try {
					stub.calledOnce.should.eql(true);
          code.should.eql(200);
          data.should.eql([{
            id: devices[0],
            owner: { id: owners[0] }
          }, {
						id: devices[1],
						owner: null
					}, {
						id: devices[2],
						owner: { id: owners[1] }
					}]);

          stub.restore();
          done();
        } catch(e) {
          done(e);
        }
      }
    };

    DeviceController.getAll(req, res);
  });

	/*it('Should create a new device', function(done) {
		var device = Faker.Helpers.randomNumber(404);
		var req = {
			method: 'POST',
			params: { id: device }
		};
	});*/

	after(function() {
		Users.get.restore();
	});
});
