

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
NormalUser = require('./models/normalUser'); // include User Model

mongoose.connect('mongodb://localhost/webprog'); // connect to mongoose, with location of database
var db = mongoose.connection; // database object

app.get('/', function(req, res){ // set route for root
  res.send('Please use /api/normalUsers or /api/admins');
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


app.get('/api/admins/:_id', function(req, res){ // set route to get single Admin
  Admin.getAdminById(req.params._id, function(err, admin){
    if(err){
      throw err;
    }
    res.json(admin);
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

app.get('/api/normalUsers', function(req, res){ // set route to get all NormalUsers
  NormalUser.getNormalUsers(function(err, normalUsers){
    if(err){
      throw err;
    }
    res.json(normalUsers);
  });
});


app.get('/api/normalUsers/:_id', function(req, res){ // set route to get single NormalUser
  NormalUser.getNormalUserById(req.params._id, function(err, normalUser){
    if(err){
      throw err;
    }
    res.json(normalUser);
  });
});


app.post('/api/normalUsers', function(req, res){ //set route to add NormalUser
  var normalUser = req.body; // save form input with body-parser into a NormalUser object
  NormalUser.addNormalUser(normalUser, function(err, normalUser){
    if(err){
      throw err;
    }
    res.json(normalUser);
  });
});


app.put('/api/normalUsers/:_id', function(req, res){ // set route to update NormalUser
  var id = req.params._id;
  var normalUser = req.body;
  // options will be left blank {}
  NormalUser.updateNormalUser(id, normalUser, {}, function(err, normalUser){
    if(err){
      throw err;
    }
    res.json(normalUser);
  });
});


app.delete('/api/normalUsers/:_id', function(req, res){ // route to delete normalUser
  var id = req.params._id;
  var normalUser = req.body;
  NormalUser.removeNormalUser(id, function(err, normalUser){
    if(err){
      throw err;
    }
    res.json(normalUser);
  });
});

/*--------------------------------------------------*/


// listen for incoming connections on port: 3000
var server = app.listen(3000);


/*

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

*/
