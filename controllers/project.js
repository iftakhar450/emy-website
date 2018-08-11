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
    console.log("test from project");

    console.log("________________________________________");
  });

routerUser.route("/sides")
	.post(function(req,res){
		
		if(typeof req.headers=='undefined')
		{
			return res.status(400).json({message:"No Header Attached."});
		}
		if(typeof req.headers['token']=='undefined' || req.headers['token'].length<3)
		{
			return res.status(400).json({message:"Token Not Sent In Header."});
		}
		if(typeof req.body.data=='undefined')
		{
			return res.status(400).json({message:"No Data Object Sent."});
		}
		
		var token =JSON.parse(req.headers['token']);
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
	
	jwt.verify(token, config.secret, function(err, decoded) {
							
				db("projects").find({status:"in progress",supervisor_id:req.body.data.id}).exec(function(err,projects){

					if(!projects)
						return res.status(400).json({message:"No record found"});
					console.log("--------------------------projects------------------------------------------");
					console.log(JSON.stringify(projects));
					console.log("---------------------------projects-----------------------------------------");

						res.status(200).json({ auth: true, projects });
				});			
		});
	
	});
  
///////////////////////////////////////////////////////////////////////////////////////////	
module.exports=routerUser;