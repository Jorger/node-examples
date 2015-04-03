var http = require('http');
var port = process.env.port || 80;
var path = require('path');
var fs = require('fs');

http.createServer(function(req,res){
	//console.log(req.url);
	//console.log(req.headers);
	// __dirname reference the name of the directory the script is executing in
	var filePath = path.join(__dirname,req.url);

	try{
		var stat = fs.statSync(filePath);
		
		//Optional
		res.writeHead(200,{
			//'Content-Type': 'text/plain',
			'Content-Length' : stat.size
		});// Sends http status code and collection of headers back to the client


		// This line opens the file as a readable stream
		var readstream = fs.createReadStream(filePath);

		// This will wait until we know the readable stream is actually valid before piping
		readstream.on('open',function(){
			readstream.pipe(res);
		});

		// This catches any errors that happen while creating the readable stream (usually invalid names)
		readstream.on('error',function(error){
			res.end("Error occurred: "+error);
		});
	}
	catch(err){
		res.end("Sorry file not found..");
		console.log(err);
	}
	//res.write("<title>hello</title>");
	//res.end('You are now connected'); // can also be called without any params as well
}).listen(port);
