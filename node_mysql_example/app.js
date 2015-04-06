var express = require('express');

var app = express();
var path = require('path');
var routes  = require('./routes/index');

//define a static path so we don't need to resolve a path in every route.
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/public/js"));
app.use(routes);

//Listend on port 3000
app.listen(3000);
