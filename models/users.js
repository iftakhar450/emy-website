module.exports = {
	identity: 'users',
	
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
		token: 'string',
		supervisor_id:'number'
		
		/*
		locations_to_user_Fk:{
			collection:'locations',
			via:'user_id'
		}*/
	}
};
