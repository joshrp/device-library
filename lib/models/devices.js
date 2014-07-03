var dino = require('dino');

var Devices = dino.model({
    schema: dino.schema({
        table: 'devices',
        attributes: {
						id: 		dino.types.number,
            name:		dino.types.string,
            OS: 		dino.types.string,
						owner: 	dino.types.number
        },
        key: {
            hash: 'name'
        }
    })
});

module.exports = Devices;
