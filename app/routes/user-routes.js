/*------------------------------------------------------------------------------
  ROUTES FOR USERS
------------------------------------------------------------------------------*/

module.exports = function(app, passport){

  // HOMEPAGE with links to login ===============================================
  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  // LOGIN shows login form =====================================================
  app.get('/login', function(req, res) {
    // render page and pass in flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

   // process the login form
   // app.post('/login', do all our passport stuff here);

   // SIGNUP with signup form ===================================================
  app.get('/signup', function(req, res) {
    // render page and pass in flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

   // process the signup form
   // app.post('/signup', do all our passport stuff here);


   // PROFILE SECTION ==========================================================
   // protected and only visible when logged in
   // use route middleware to verify this (isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // LOGOUT ====================================================================
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
