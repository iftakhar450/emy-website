module.exports = {
	identity: 'projects',
	
	connection: 'mysqlDB',
	schema:true,
	migrate: 'safe',
	
	attributes: {
		SN:{type: 'number',
					primaryKey:true,
					autoIncrement:true},

        id: 'string',
		owner: 'string',
		urduname: 'string',
		plot: 'string',
		sector: 'string',
		supervisor_id: 'string',
		status: 'string'
		
		
	}
};
