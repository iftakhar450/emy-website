var express=require("express");
var routerUser=express.Router();

var bodyParser = require('body-parser');
routerUser.use(bodyParser.urlencoded({ extended: false }));
routerUser.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config.js');
var async=require("async");
routerUser.route("/test2")
.get(function(req, res){
 	 console.log("________________________________________");
    console.log("test from attendence");

    console.log("________________________________________");
  });


routerUser.route("/today/alluser/attendence")
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
									console.log("-----------------------------------");
								console.log(req.body.data.search_date);
								console.log("-----------------------------------");
								db("attendence").find({date:req.body.data.search_date}).exec(function(err,records){


										if(!records){

										return res.status(404).send({ auth: false, message: 'No record found for this date' });
										}
										console.log("-----------------------------------");
										console.log(JSON.stringify(records));
										console.log("-----------------------------------");
										return res.status(200).send({ records});

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
routerUser.route("/post/attendence")
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

								
								 post_attendence(function(response){		    			
								
								console.log("after wait in"+response);
								return res.status(200).send({ response });
   									
									},req.body.data);

										
							
							
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

	async function post_attendence(callback,data){

		
	
 		
 			db("attendence").create(data.data).exec(function(err,record){
									if(!err)
									{		
										console.log("ssssssssssss");
										return callback(record);
											
									}
									if(err)
									{
										console.log("eeeeeeeeeeeeeeeee");
										return callback(err);
									}
								});

 			

		

 }
  
///////////////////////////////////////////////////////////////////////////////////////////	
module.exports=routerUser;