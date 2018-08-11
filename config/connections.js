var mysqlAdapter = require('sails-mysql');
var mongoAdapter = require('sails-mongo');

module.exports = {
	adapters: {
		mongoAdapt: mongoAdapter,
		mysqlAdapt: mysqlAdapter
	},

  connections: {

	/*mongoDB: {
		adapter: 'mongoAdapt',
		module: 'sails-mongo',
		url: "mongodb://localhost:27017/emy"
	},
*/
    mysqlDB: {
		adapter: 'mysqlAdapt',
		host: 'us-cdbr-iron-east-04.cleardb.net',
		database: 'heroku_40817b2c0725f53',
		user:'b640f654769f32',
		password:'db1cbfc5',
		supportBigNumbers:true, //true/false
		debug:['ComQueryPacket'], //false or array of node-mysql debug options
		trace:true //true/false
		
    } 
  }
};
