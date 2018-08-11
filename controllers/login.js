var express=require("express");
var routerUser=express.Router();

var bodyParser = require('body-parser');
routerUser.use(bodyParser.urlencoded({ extended: false }));
routerUser.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config.js');

routerUser.route("/test1")
.get(function(req, res){
 	 console.log("________________________________________");
    console.log("test from login");

    console.log("________________________________________");
  });

//LOGIN
	routerUser.route("/superuser/login")
	.post(function(req,res){
		
		if(typeof req.body.data=='undefined')
		{
			return res.status(400).json({message:"No Data Object Sent."});
		}
		
		if(typeof req.body.data.id=='undefined' || typeof req.body.data.password=='undefined')
		{
			return res.status(400).json({message:"Incorrect/Less Than Required Parameters Sent."});
		}
		
		var id=req.body.data.id;
		var pswd=req.body.data.password;
		
		var token ;
		
				db("superusers").findOne({"id":id,"password":pswd})				
				.exec(function (err,user){
					if (!user) return res.status(404).json({message:"No user exsist with  this id."});
					// create a token			
					token = jwt.sign({ id:pswd}, config.secret, {
						expiresIn: 86400 // expires in 24 hours	
					});
					user.token=token;
				
					user.save();					
					res.status(200).json({ auth: true, token: token, user });
				
				});
	});

  
///////////////////////////////////////////////////////////////////////////////////////////	
module.exports=routerUser;