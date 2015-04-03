/*
This  is a client that connects to a webserver running on teh local 
host. It retrieve a file specific via command line then writes it to 
the file test.txt and writes it the console as well.

Instructions :

start webserver.js
node client.js name_of_file_we_want  name_of_file_to_write_to
*/

//Pull in the required modules
var http = require("http");
var fs = require('fs');
var writer = require('./write_to_file');

//Get the filname
var filename = process.argv[2];	
var new_file_name = process.argv[3];

var options = {
	host: 'localhost',
	port: 80,
	path: "/"+filename,
	method: 'GET'
};

var callback = function(response){
	response.setEncoding("utf8");	
	response.on('data',function(data){
		writer(new_file_name,data);
	});
	response.on('error',console.error);
};

http.get(options,callback);