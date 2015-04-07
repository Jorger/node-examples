var dbconfig = require('../config/config');
var mysql = require('mysql');
var pool = mysql.createPool(dbconfig.DB);												//add a connection pool so that the db can handle multiple concurrent connections.


/*
* module to handle our database request  params : request, response, "mysql query"
*/

var handler = handler || {};
handler.pool = pool;

handler.makecall = function(req,res,queryString){
	pool.getConnection(function(err,connection){
		if(err){
			connection.release();
			res.json(dbconfig.ERROR);
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
			res.json(dbconfig.ERROR);
		});
	});
}

module.exports = handler;
