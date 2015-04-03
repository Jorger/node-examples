var fs = require('fs');
module.exports = function(new_file,data){
	fs.writeFile(new_file,data,function(err){
		if(err){
			return console.log(err);
		}
		console.log('file saved!!');
	});
};