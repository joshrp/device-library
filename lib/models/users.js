var dino = require('dino');

var Users = dino.model({
    schema: dino.schema({
        table: 'users',
        attributes: {
						id: dino.types.number,
            name: dino.types.string,
            team: dino.types.string,
						email: dino.types.string
        },
        key: {
            hash: 'id'
        }
    })
}); 

module.exports = Users;
