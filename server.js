/*------------------------------------------------------------------------------
  SERVER FILE
------------------------------------------------------------------------------*/

// set up modules ==============================================================
var express         = require('express');
var app             = express();
var port            = process.env.PORT || 3000;

// set up MongoDB
var mongoose        = require('mongoose');
var configDB        = require('./config/database.js');
// set up middleware
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var passport        = require('passport');
var flash           = require('connect-flash');

var path            = require('path');
var favicon         = require('serve-favicon');

// configuration ===============================================================
configDB = require('./config/database.js'); // connect to database
mongoose.connect(configDB.url, { // connect to MongoDB
  // http://mongoosejs.com/docs/connections.html#use-mongo-client
  useMongoClient: true
});
require('./config/passport.js')(passport); // pass passport for config

// set up Views and Templating Engine ==========================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // use pug as templating-engine

// fav-icon ====================================================================
app.use(favicon(path.join(__dirname, 'public', 'fav-webprog.ico')));

// set up Express Application ==================================================
app.use(morgan('dev')); // log request to console
app.use(cookieParser()); // read cookies. required for auth
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // location static file

// requirements for passport ===================================================
app.use(session({
  secret: 'webprog', // session secret
  resave: false, // https://github.com/expressjs/session#resave
  saveUninitialized: false // https://github.com/expressjs/session#saveuninitialized
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // stores flash messages in session

// routes ======================================================================
// load routes and pass in app with fully configured passport
require('./app/routes.js')(app, passport);

// launch ======================================================================
// app.set('port', port);
// var server = http.createServer(app);
// server.listen(port);
app.listen(port);
console.log('Server running on port: ' + port);
