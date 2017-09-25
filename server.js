console.log("server is starting");

// import module express
var express = require ('express');
// execute express to initiate web app. (express package is a reference to a function.)
var app = express();
// listen for incoming connections on port: 3000
var server = app.listen(3000);

// callback function for testing purposes. (response in console)
function listening(){
  console.log("listening. . .");
}
// use express to host static file in 'public' folder (default starts index.html file)
app.use(express.static('public'));
