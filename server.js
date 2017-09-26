
// file system package thats build into node
var fs = require('fs');
// requesting the words.json file
var data = fs.readFileSync('words.json');
// sync means that the next line of code will not be finished until the action before has been finished. will this is happening the server cannot work on other tasks.
// parsing the data into readable JSON notation
var words = JSON.parse(data);

console.log(words);
//console.log("server is starting");


// import module express
var express = require ('express');
// execute express to initiate web app. (express package is a reference to a function.)
var app = express();
// adding the body-parser module
var bodyParser = require('body-parser');

// middleware to initialize the body-parser, so a post request will actually not run forever
app.use(bodyParser.json());

// adding the body-parser module
var mongoose = require('mongoose');

// include the genre Object
Genre = require('./models/genre');

// include the Book Object
Book = require('./models/books');

// connect to mongoose, wich we pass the location of the databse
mongoose.connect('mongodb://localhost/webprog');
//database object
var db = mongoose.connection;
//setup route for the homepage
app.get('/', function(req, res){
  res.send('Please use /api/books or /api/genre');
});

//setup route for the genre collection
app.get('/api/genres', function(req, res){
  Genre.getGenres(function(err, genres){
    if(err){
      throw err;
    }
    res.json(genres);
  });
});

//route for adding genres
app.post('/api/genres', function(req, res){
  // with the body-parser we can access everything that comes into the form and then save into a genre object.
  var genre = req.body;
  Genre.addGenre(genre, function(err, genre){
    if(err){
      throw err;
    }
    res.json(genre);
  });
});

//route for updating a genre
app.put('/api/genres/:_id', function(req, res){
  var id = req.params._id;
  var genre = req.body;
  // options will be left blank {}
  Genre.updateGenre(id, genre, {}, function(err, genre){
    if(err){
      throw err;
    }
    res.json(genre);
  });
});

//route for deleting genres
app.delete('/api/genres/:_id', function(req, res){
  var id = req.params._id;
  var genre = req.body;
  Genre.removeGenre(id, function(err, genre){
    if(err){
      throw err;
    }
    res.json(genre);
  });
});


/*--------------------------------------------------*/

//setup route for the book collection
app.get('/api/books', function(req, res){
  Book.getBooks(function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  });
});

//route for adding books
app.post('/api/books', function(req, res){
  var book = req.body;
  Book.addBook(book, function(err, book){
    if(err){
      throw err;
    }
    res.json(book);
  });
});

//setup route for a single book
app.get('/api/books/:_id', function(req, res){
  Book.getBookById(req.params._id, function(err, book){
    if(err){
      throw err;
    }
    res.json(book);
  });
});

//route for updating a book
app.put('/api/books/:_id', function(req, res){
  var id = req.params._id;
  var book = req.body;
  Book.updateBook(id, book, {}, function(err, book){
    if(err){
      throw err;
    }
    res.json(book);
  });
});

//route for deleting books
app.delete('/api/books/:_id', function(req, res){
  var id = req.params._id;
  var book = req.body;
  Book.removeBook(id, function(err, book){
    if(err){
      throw err;
    }
    res.json(book);
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
