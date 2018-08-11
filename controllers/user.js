var express=require("express");
var routerUser=express.Router();

var bodyParser = require('body-parser');
routerUser.use(bodyParser.urlencoded({ extended: false }));
routerUser.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config.js');

routerUser.route("/test2")
.get(function(req, res){
 	 console.log("________________________________________");
    console.log("test from user");

    console.log("________________________________________");
  });

routerUser.route("/get/supervisor/user")
	.post(function(req,res){
		
		if(typeof req.headers=='undefined')
		{
			return res.status(400).json({message:"No Header Attached."});
		}
		if(typeof req.headers['token']=='undefined' || req.headers['token'].length<3)
		{
			return res.status(400).json({message:"Token Not Sent In Header."});
		}
		
		var token =JSON.parse(req.headers['token']);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
	
	jwt.verify(token, config.secret, function(err, decoded) {
							
				db("superusers").find().exec(function(err,supervisors){
					for(i=0;i<supervisors.length;i++){
						if(supervisors[i].token==token)
						{	
							var response;
							new Promise(function(resolve, reject) {
								db("users").find().exec(function (err,users){

									response=users;
								});
								setTimeout(() => resolve(1), 100);
							}).then(function() {
								if(response){
									//res.charset = 'utf8_general_ci'
									var date=new Date();


									get_today_already_submitted_attendence(function(previous){
													
										console.log("------------------------date--------------------------")
										console.log(date)
										console.log("-------------------------date-------------------------")
										return res.status(200).json({response,date,previous});


									},date);

									
								}
								else{

									return res.status(404).send({message:"No Record Found."});
								}
									
									
								});
							break;
						}
						else if((i==(supervisors.length-1)) && supervisors[i].token!=token)
						{
							return res.status(404).send({ auth: false, message: 'Failed to authenticate token.' });
						}
					}
				});			
		});
	
	});
  
   async function get_today_already_submitted_attendence(callback,date){

							
 		//	console.log("============================================");
 			console.log(date.getDate()+"-"+Number(date.getMonth()+1)+"-"+date.getFullYear());

 			var d=date.getFullYear()+"-"+Number(date.getMonth()+1)+"-"+date.getDate(); 			
 		
 			db("attendence").find({date:d}).exec(function (err,res){

 								 if (err) return err;
   								 if(res) return callback(res);
									
								});
 								

 								}
 			

 

///////////////////////////////////////////////////////////////////////////////////////////	
module.exports=routerUser;