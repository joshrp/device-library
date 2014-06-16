var sinon = require('sinon')

describe('/devices Routing', function () {
	describe('GET /devices', function () {
		var routes = require('../../routes/devices');
		it('should ask the model for all devices', function () {
			routes.getAll().should.equal({})
		})
	})
})