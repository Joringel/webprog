

var fs = require('fs'); // import integrated node module file system package
var data = fs.readFileSync('words.json'); // synced request 'words.json' file
var words = JSON.parse(data); // parse data into JSON Notation

console.log(words);

var express = require ('express'); // import module express module
var app = express(); // execute express to initiate web app

var bodyParser = require('body-parser'); // adding body-parser module
app.use(bodyParser.json()); // middleware to initialize body-parser
var mongoose = require('mongoose'); // adding body-parser module


Admin = require('./models/admin'); // include Admin Model
User = require('./models/user'); // include User Model

mongoose.connect('mongodb://localhost/webprog'); // connect to mongoose, with location of database
var db = mongoose.connection; // database object

app.get('/', function(req, res){ // set route for root
  res.send('Please use /api/users or /api/admins');
});

/*----------------------------------------------------
ADMIN ROUTES
----------------------------------------------------*/

app.get('/api/admins', function(req, res){ // set route to get all Admins
  Admin.getAdmins(function(err, admins){
    if(err){
      throw err;
    }
    res.json(admins);
  });
});


app.post('/api/admins', function(req, res){ //set route to add Admin
  var admin = req.body; // save form input with body-parser into a admin object
  Admin.addAdmin(admin, function(err, admin){
    if(err){
      throw err;
    }
    res.json(admin);
  });
});


app.get('/api/admins/:_id', function(req, res){ // set route to get single Admin
  Admin.getAdminById(req.params._id, function(err, admin){
    if(err){
      throw err;
    }
    res.json(admin);
  });
});


app.put('/api/admins/:_id', function(req, res){ // set route to update admin
  var id = req.params._id;
  var admin = req.body;
  // options will be left blank {}
  Admin.updateAdmin(id, admin, {}, function(err, admin){
    if(err){
      throw err;
    }
    res.json(admin);
  });
});


app.delete('/api/admins/:_id', function(req, res){ // route to delete admin
  var id = req.params._id;
  var admin = req.body;
  Admin.removeAdmin(id, function(err, admin){
    if(err){
      throw err;
    }
    res.json(admin);
  });
});

/*----------------------------------------------------
USER ROUTES
----------------------------------------------------*/


app.get('/api/users', function(req, res){ // set route to get all users
  User.getUsers(function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  });
});


app.get('/api/users/:_id', function(req, res){ // set route to get single user
  User.getUserById(req.params._id, function(err, user){
    if(err){
      throw err;
    }
    res.json(user);
  });
});

app.post('/api/users', function(req, res){ //set route to add User
  var user = req.body;
  User.addUser(user, function(err, user){
    if(err){
      throw err;
    }
    res.json(user);
  });
});


app.put('/api/users/:_id', function(req, res){ // set route to update a user
  var id = req.params._id;
  var user = req.body;
  User.updateUser(id, user, {}, function(err, user){
    if(err){
      throw err;
    }
    res.json(user);
  });
});


app.delete('/api/users/:_id', function(req, res){ // route to delete a user
  var id = req.params._id;
  var user = req.body;
  User.removeUser(id, function(err, user){
    if(err){
      throw err;
    }
    res.json(user);
  });
});

/*--------------------------------------------------*/


// listen for incoming connections on port: 3000
var server = app.listen(3000);

// callback function for testing purposes. (response in console)
// function listening(){
//   console.log("listening. . .");
// }

// use express to host static file in 'public' folder (default starts index.html file)
app.use(express.static('public'));

// parse application/x-www-form-urlencoded from body-parser-module
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json from body-parser-module
app.use(bodyParser.json())

// get request of route /flower respond with callback function sendFlower()
app.get('/flower', sendFlower );

// user sends request and the sever gives a response
function sendFlower(request, response){
  response.send("I love flowers too");
}

// ADD ROUTE
// route add followed by User Input
// this should actually be a post request. because something will be saved on the server
app.get('/add/:word/:score?', addWord);

function addWord(request, response){
  //flower is a parameter
  var data = request.params;
  var word = data.word;
  // parse it to a number
  var score = Number(data.score);

  if (!score) {
    var reply = {
      msg: "Score is required."
    }
      response.send(reply);
  } else{
    // taking the data from user word, score and putting it into the object (key, value : word, score) Assign in DB: words the 'score' to the 'word'
    words[word] = score;
    // muss wieder von JSON in raw data zurückgewandelt werden um gespeichert werden zu können.
    // stringify löscht darüber hinaus alle whitespace character raus. mit 'null,2' wird identiert
    var data = JSON.stringify(words, null, 2);
    // we want to write the data asynchronys. fs.writeFile(file, data[options], callback). replaces the file if it already exists
    fs.writeFile('words.json', data, finished);
      function finished(err){
        console.log('all set.');
        var reply = {
          word: word,
          score: score,
          status: "success"
        }
          response.send(reply);
      }
    }
}

app.get('/all', sendAll);

function sendAll(request, response){
  response.send(words);
}

// SEARCH ROUTE
app.get('/search/:word/', searchWord);

function searchWord(request, response){
  var word = request.params.word;
  var reply;

  if (words[word]){
    reply= {
    status: "found",
    word:  word,
    score: words[word]
    }
  } else {
    reply= {
    status: "not found",
    word: word
    }
  }
  response.send(reply);
}

// post request to give away and save it on the server, like typing password and username(scurity matter for hidden data. also image and sound and ohter large data cant be send via a get request) get request to get information back like a search request.
app.post('/analyze', analyzeThis);
function analyzeThis(request, response){
  // with ''.body' the body will be excluded via the body-parser-module
  console.log(request.body);
  var reply = {
    msg: 'thank you.'
  }
    response.send(reply);
}
