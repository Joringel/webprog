/*------------------------------------------------------------------------------
  ROUTES FOR USERS
------------------------------------------------------------------------------*/

module.exports = function(app, passport){

  // HOMEPAGE with links to login ===============================================
  app.get('/', function(req, res) {
    res.render('index.pug'); // load the index.ejs file
  });

  // LOGIN shows login form =====================================================
  app.get('/login', function(req, res) {
    // render page and pass in flash data if it exists
    res.render('login.pug', { message: req.flash('loginMessage') });
  });

  // PROCESS login form =========================================================
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to signup page if error
      failureFlash : true // allow flash messages
  }));

   // SIGNUP with signup form ===================================================
  app.get('/signup', function(req, res) {
    // render page and pass in flash data if it exists
    res.render('signup.pug', { message: req.flash('signupMessage') });
  });

  // PROCESS signup form ========================================================
      app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/signup', // redirect back to signup page if error
          failureFlash : true // allow flash messages
      }));

   // PROFILE SECTION ===========================================================
   // protected and only visible when logged in
   // use route middleware to verify this (isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.pug', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // LOGOUT =====================================================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}


//   function isLoggedIn(req, res, next) {
//     if(req.isAuthenticated())
//       return next();
//
//     res.redirect('/');
//   }
// function isAdmin(req, res, next) {
// app.get('/admin', isLoggedIn, isAdmin, function (req, res) {

//app/routes.js
// var User          = require('../app/models/user');
