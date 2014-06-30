API:

	GET /devices 200
		[{
			id: ''
			name: 'iPhone 3GS'
			OS: 'iOS6'
			owner: {
				id: ''
				name: ''
				team: ''
				email: ''
			}
		}]

	POST /devices 
		Req: {
			id: ''
			name: 'iPhone 3GS'
			OS: 'iOS6'
		}
		Resp 200: ''
		Resp 401: {
 			failue: 'ID taken'
 		}

 	PUT /devices/{id}
 		Req: { // All optional
 			id: ''
			name: 'iPhone 3GS'
			OS: 'iOS6'
			owner: '{ownerId}'
 		}
 		Resp 200: ''
 		Resp 401: {
 			failure: 'Name should be string' / 'owner block incomplete'
 		}

 	DELETE /devices/{id}
 		Resp 200:''
 		Resp 404

 	GET /users
 		[{
 			id: ''
			name: ''
			team: ''
			email: ''
 		}]

 	POST /users 
 		Req: {
			name: ''
			team: ''
			email: ''
 		}
 		Resp 200: {
 			id: ''
 		}
 		Resp 401: {
 			failure: 'Name should be string'
 		}

 	PUT /users/{id} 
 		Req: {
			name: ''
			team: ''
			email: ''
 		}
 		Resp 200: ''
 		Resp 401: {
 			failure: 'Name should be string'
 		}

 	DELETE /users/{id}
 		Resp 200:''
 		Resp 404
