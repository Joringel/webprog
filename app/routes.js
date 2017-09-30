/*------------------------------------------------------------------------------
  ROUTES FOR USERS
------------------------------------------------------------------------------*/

var User       = require('../app/models/user');
var Department = require('../app/models/department');
var Project = require('../app/models/project');

module.exports = function(app, passport){

  // HOMEPAGE with links to login ===============================================
  app.get('/', function(req, res) {
    res.render('index.pug'); // load the index.ejs file
  });
/*----------------------------------------------------------------------------*/

  // LOGIN shows login form =====================================================
  app.get('/login', function(req, res) {
    // render page and pass in flash data if it exists
    res.render('login.pug', { message: req.flash('loginMessage') });
  });

  // PROCESS login form =========================================================
  app.post('/login', passport.authenticate('login', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to login page if error
      failureFlash : true // allow flash messages
  }));
/*----------------------------------------------------------------------------*/




   // SIGNUP with signup form ===================================================
  app.get('/signup', function(req, res) {
    // render page and pass in flash data if it exists
    Department.find({}, function(err, department){ // search for all departments
      if (err)
        res.redirect('/');
      var dept = {};
      if (department)
        dept = department;
    res.render('signup.pug', { message: req.flash('signupMessage'),
                                            department: dept });
    });
  });

  // PROCESS signup form ========================================================
  app.post('/signup', passport.authenticate('signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to signup page if error
      failureFlash : true // allow flash messages
  }));
/*----------------------------------------------------------------------------*/




// ADMIN SECTION ============================================================
app.get('/admin', isLoggedIn, isAdmin, function (req, res) {
  Department.find({}, function(err, department){ // search for all departments
    if (err)
      res.redirect('/');
    var dept = {};
    if (department)
      dept = department; // departments werden in dept gespeichert

  User.find({}, function(err, user){
    if (err)
      res.send(err);
    if(user){
      res.render('admin.pug', {
        user: user, // all user that were found in DB
        department : dept
      });
    } else
      res.redirect('/profile.pug');
      });
    });
  });

   // Create Department as Admin=================================================
  app.post('/admin/department', isLoggedIn, isAdmin, function(req, res) {

    if (req.body.departmentname && req.body.departmentname){
      var newDepartment = new Department;
      newDepartment.departmentname = req.body.departmentname;
      newDepartment.departmentnumber = req.body.departmentnumber;

    newDepartment.save(function(err) {
    if(err)
      throw err;
    });
    }
    res.redirect('/admin');
  });

   // Delete Department as Admin=================================================
  app.get('/admin/department/:_id/delete', isLoggedIn, isAdmin, function(req, res) {
    var department = req.params._id
    Department.findByIdAndRemove(department, function(err){
      if (err)
        res.send(err);
    res.redirect('/admin');
    });
  });

  // ADMIN SECTION ============================================================
  app.post('/admin/user', isLoggedIn, isAdmin, function (req, res) {

    User.findOne({ 'email' :  email }, function(err, user) {
        if (err) // if error occurs return error
            res.redirect('/admin');
        if (user) { // checks if user with that email already exists
            res.redirect('/admin');
        } else {
            // if there is no user with that email
            // Create the User ================================================
            var newUser                 = new User();
            // set the user's local credentials
            newUser.email               = email;
            newUser.password            = newUser.generateHash(password);
            newUser.plainpassword       = password;
            newUser.username            = req.body.username;
            newUser.name.firstname      = req.body.firstname;
            newUser.name.lastname       = req.body.lastname;
            newUser.location.street     = req.body.street;
            newUser.location.postcode   = req.body.postcode;
            newUser.departmentnumber    = req.body.department;

            // save the user
            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
        }
    });
    });



    // ADMIN SECTION ============================================================
    app.get('/admin/:user_id/profile', isLoggedIn, isAdmin, function (req, res) {
      Project.find({}, function(err, project){ // search for all departments
        if (err)
          res.redirect('/');
        var proj = {};
        if (project)
          proj = project; // departments werden in dept gespeichert

      User.findById(req.params.user_id, function(err, user){
        if (err)
          res.send(err);
        if(user)
        res.render('profile.pug', {
          user: user, // set user by requested user_id
          project: proj
        });
        else
          res.redirect('/admin');
      });
    });
});


    // ADMIN SECTION ============================================================
    app.get('/admin/:user_id/delete', isLoggedIn, isAdmin, function (req, res) {
        var user = req.params.user_id
        User.findByIdAndRemove(user, function(err){
          if (err)
            res.send(err);
        res.redirect('/admin');
        });
      });

   // PROFILE SECTION ===========================================================
   // protected and only visible when logged in
   // use route middleware to verify this (isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    Project.find({}, function(err, project){ // search for all departments
      if (err)
        res.redirect('/');
      var proj = {};
      if (project)
        proj = project; // departments werden in dept gespeichert

    res.render('profile.pug', {
      user: req.user, // get the user out of session and pass to template
      project: proj // get the user out of session and pass to template
    });
  });
});

  app.post('/profile', isLoggedIn, function(req, res) {
    var user = req.user;
    if(req.body.username) { user.username = req.body.username; }
    if(req.body.password) { user.password = user.generateHash(req.body.password);
                                        user.plainpassword = req.body.password;}
    user.save(function(err) {
    if(err) {next(err)}
      else {
        res.redirect('/profile'); // page reload when new password saved
      }
    })
  });

  app.post('/project/create', isLoggedIn, function(req, res) {
    if (req.body.projectname && req.body.projecttext){
    var newProject = new Project();

    newProject.projectname  = req.body.projectname;
    newProject.projecttext  = req.body.projecttext;
    newProject.projectowner = req.user._id;

    newProject.save(function(err) {
    if(err)
      throw err;
    });
    }
    res.redirect('/profile');
  });


  // Delete Department as Admin=================================================
 app.get('/profile/project/:_id/delete', isLoggedIn, function(req, res) {
   var project = req.params._id
   Project.findByIdAndRemove(project, function(err){
     if (err)
       res.send(err);
   res.redirect('/profile');
   });
 });

/*----------------------------------------------------------------------------*/

  // LOGOUT =====================================================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
/*----------------------------------------------------------------------------*/

// ROUTE MIDDLEWARE METHODS ====================================================
// make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}

// make sure is logged in and is an Admin
function isAdmin(req, res, next){
  if(req.user.is_admin == true)
  return next();
  res.redirect('/');
}
