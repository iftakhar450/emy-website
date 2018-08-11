module.exports = {
	identity: 'superusers',
	
	connection: 'mysqlDB',
	schema:true,
	migrate: 'safe',
	
	attributes: {
		id:{type: 'number',
					primaryKey:true,
					autoIncrement: true},
		password: 'string',
		name: 'string',
		urdu_name: 'string',
		status: 'string',
		profession: 'string',
		mobile: 'string',
		token: 'string'
		

		
	}
};
