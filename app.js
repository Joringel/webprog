/*------------------------------------------------------------------------------
  SERVER FILE
------------------------------------------------------------------------------*/

// set up modules ==============================================================
var express         = require('express');
var app             = express();
var router          = express.Router();
var port            = process.env.PORT || 3000;

// set up MongoDB
var mongoose        = require('mongoose');
var configDB        = require('./config/database.js');
// set up Auth Modules
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var passport        = require('passport');
var flash           = require('connect-flash');

var path            = require('path');
var favicon         = require('serve-favicon');

// initiate Routes =============================================================
var index         = require('./routes/index');
var users         = require('./routes/users');
var serverstat    = require('./routes/serverstatus');

app.use('/', index); // routes to base URL
app.use('/users', users); // /users route
app.use('/serverstatus', serverstat); // /serverstatus route

// configure DB ================================================================
configDB = require('./config/database.js');

// set up Views and Templating Engine ==========================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// fav-icon ====================================================================
app.use(favicon(path.join(__dirname, 'public', 'fav-webprog.ico')));

// set up Express Application ==================================================
app.use(morgan('dev')); // log request to console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // read cookies. required for auth
app.use(express.static(path.join(__dirname, 'public')));

// requirements for passport ===================================================
app.use(session({ secret: 'webprog' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // stores flash messages in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // in development there will be error messages for better debugging

  // render the error page
  res.status(err.status || 500); // in production there will be no information about what went wrong
  res.render('error');
});

module.exports = app;

// launch ======================================================================
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
console.log('Server running on port ' + port);
