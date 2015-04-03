var list_extensions = require('./list_dir_ext');

//gather user input via command line
//The first element will be 'node', the second element will be the name of the JavaScript file.
//The next will be any additional command line args (which is what we are interested in).
var args = process.argv;									

//[dir,extension to filter by, call] : function (dir, filterStr, callback)
list_extensions(args[2],args[3],function(err,mydata){
	if(!mydata){
		console.log("No data returned");
		return;
	}
	
	mydata.forEach(function(file){
		console.log(file);
	});
});