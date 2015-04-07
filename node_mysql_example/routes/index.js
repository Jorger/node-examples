var express  = require("express");
var router  = express.Router();
var dbhandler = require('./dbhandler');



/*
*STILL A LOT OF DUPLICATE CODE HERE. WILL REFACTOR OUT
*/
//Get all users
router.get("/",function(req,res){
	res.sendFile("index.html");
});

//Get all users
router.get("/users",function(req,res){
	dbhandler.makecall(req,res,"select * from nodeusers");
});

//Get the names of all uses in the db
router.get("/names",function(req,res){
	dbhandler.makecall(req,res,"select username from nodeusers");
});

//Get the id of all users in the db
router.get("/ids",function(req,res){
	dbhandler.makecall(req,res,"select userid from nodeusers");
});

//Get user by id
router.get("/users/:id",function(req,res){
	dbhandler.makecall(req,res,"SELECT * FROM nodeusers WHERE userid ="+req.params.id);
});


module.exports = router;