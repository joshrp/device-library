var sinon		= require('sinon');
var Q				= require('q');

var Faker 	= require('faker');
var Devices = require('models/devices');
var Users 	= require('models/users');
var uuid	= require('node-uuid');
var _		= require('underscore');

var DeviceController = require('routes/devices.js');

var sinon = require("sinon");
var chai = require("chai");
var sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe.only('Device model', function() {
	// Stub out user dependancy on each request
	beforeEach(function() {
		sinon.stub(Users, 'findOne', function(match, cb) {
				cb(null, match);
		});
	});
	afterEach(function() {
		Users.findOne.restore();
	});

	it('will include a user in the response based on the owner field', function(done) {
		var device = Faker.Helpers.randomNumber(404);
		var owner = Faker.Helpers.randomNumber(404);
		var stub = sinon.stub(Devices, 'findOne', function(match, cb) {
			match.should.have.property('id', device);
			cb(null, {
				id: match.id,
				owner: owner 
			});
		});

		var req = {
			params:{id:device}
		};

		var res = {
			json: function(code, data) {
				try {
					Users.findOne.should.have.been.calledOnce;
					Devices.findOne.should.have.been.calledOnce;
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
    var stub = sinon.stub(Devices, 'findOne', function(match, cb) {
			match.should.have.property('id', device);
			cb(null, {
        id: match.id,
        owner: null
      });
    });

    var req = {
      params:{id:device}
    };

    var res = {
      json: function(code, data) {
        try {
					Devices.findOne.should.have.been.calledOnce;
					Users.findOne.should.have.callCount(0);
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
    var stub = sinon.stub(Devices, 'find', function(cb) {
      cb(null, [{
        id: devices[0],
        owner: owners[0]
      }, {
				id: devices[1],
				owner: null
			}, {
				id: devices[2],
				owner: owners[1]
			}]);
    });

    var req = {};

    var res = {
      json: function(code, data) {
        try {
					Devices.find.should.have.been.calledOnce;
					Users.findOne.should.have.been.calledTwice;
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

	it('Should create a new device', function(done) {
		var id = Faker.Helpers.randomNumber(404),
			saveSpy = sinon.stub().callsArg(0),
			uuidStub = sinon.stub(uuid, 'v4', function(cb) {
				return id;
			}),
			createStub = sinon.stub(Devices, 'create', function() {
				return {
					save: saveSpy
				};
			}),
			device = {
				name: Faker.Company.companyName(),
				OS: Faker.Internet.domainWord()
			},
			createdDevice = _.extend({id:id}, device);
			req = {
				method: 'POST',
				body: device
			};

		var res = {
			setHeader: sinon.spy(),
			status: sinon.spy(),
			end: function() {
				try {
					createStub.should.have.been.calledOnce;
					createStub.should.have.been.calledWith(createdDevice);

					saveSpy.should.have.been.calledOnce;

					res.setHeader.should.have.been.calledOnce;
					res.setHeader.should.have.been.calledWith('Location', ['/devices/', id].join(''));
					res.status.should.have.been.calledOnce;
					res.status.should.have.been.calledWith(201);

					uuidStub.restore();
					createStub.restore();

					done();
				} catch (e) {
					done(e);
				}
			}
		};

		DeviceController.create(req, res);
	});
});
