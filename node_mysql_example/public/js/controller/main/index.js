/*
* One index file per directory to tell browserify  what dependencies to  include
*/

var app = require('angular').module('myApp');
app.controller('mainCtrl',require('./mainCtrl'));