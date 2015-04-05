var express = require("express");
var http = require("http");
var app = express();
var path = require("path");

app.all("*", function(request, response, next) {

  //Left this out because  a "response header already set" error get thrown when sendFile is call later on
 //response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
  response.end("Home page");
});

//Extract a parameter from request url
app.get('/user/:userid',function(request,response){
  response.end("User id = "+ request.params.userid);
});

app.get('/files/:filename',function(error,request,response,next){

  //note that there is no error checking  done here, so path specifics are displayed to the
  //user, this is a no no and could lead to the application being compromised
  response.sendFile(path.join(__dirname,"/"+request.params.filename + ".txt"));
});

app.get("/about", function(request, response) {
  response.end("About page");
});

app.get("*", function(request, response) {
  response.end("404 found");
});

http.createServer(app).listen(1337);