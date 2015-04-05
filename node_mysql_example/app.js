var express = require('express');
var mysql = require('mysql');
var app = express();
var path = require('path');

//add a connection pool so that the 
//db can handle multiple concurrent connections.
var pool = mysql.createPool({
	connectionLimit: 100,
	host : "localhost",
	user : "root",
	password : "waviest",
	database : "node_example",
	debug : false
});


/*
* function to handle our database request
* params : request, response, "mysql query"
*/
function  handle_database(req,res,queryString){
	pool.getConnection(function(err,connection){
		if(err){
			connection.release();
			res.json({
				"code" : 100,
				"status" : "Error establishing connection"
			});
			return;
		}

		console.log("Query : "+ queryString);
		console.log("Connected as  id" + connection.threadId);

		connection.query(queryString,function(err,rows){
			connection.release();
			if(!err){
				res.json(rows);
			}
		});

		connection.on("error",function(err){
			res.json({
				"code" : 100,
				"status" : "Error establishing connection"
			});
		});
	});

}

//Get all users
app.get("/",function(req,res){
	res.sendFile(path.join(__dirname,"/public/index.html"));
});

//Get all users
app.get("/users",function(req,res){
	handle_database(req,res,"select * from nodeusers");
});

//Get the names of all uses in the db
app.get("/names",function(req,res){
	handle_database(req,res,"select username from nodeusers");
	//res.end("Hello you are connected..");
});

//Get the id of all users in the db
app.get("/ids",function(req,res){
	handle_database(req,res,"select userid from nodeusers");
	//res.end("Hello you are connected..");
});

//Get user by id
app.get("/users/:id",function(req,res){
	handle_database(req,res,"SELECT * FROM nodeusers WHERE userid ="+req.params.id);
	//res.end("Hello you are connected..");
});

//Listend on port 3000
app.listen(3000);
