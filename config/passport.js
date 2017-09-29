/*------------------------------------------------------------------------------
  PASSPORT CONFIGURATION FILE
------------------------------------------------------------------------------*/

// set up modules ==============================================================
var LocalStrategy   = require('passport-local').Strategy;

// Load User Model =============================================================
var User            = require('../app/models/user');

module.exports = function(passport) {

    // PASSPORT SESSION SETUP ===================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // serializes the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // deserializes the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL SIGNUP =============================================================
    // each login and sign up get a seperate strategy
    passport.use('signup', new LocalStrategy({
        //options hash to switch username with email for registration
        usernameField : 'email',
        passwordField : 'password',
        // allows to pass back the entire request to the callback
        passReqToCallback : true
    },
    function(req, email, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // checks to see if the user trying to login already exists
            User.findOne({ 'email' :  email }, function(err, user) {
                if (err) // if error occurs return error
                    return done(err);
                if (user) { // checks if user with that email already exists
                    return done(null, false, req.flash('signupMessage',
                    'Diese E-Mail wird bereits verwendet'));
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
    }));

    // LOCAL LOGIN ==============================================================
    // by default, if there was no name, it would just be called 'local'
    passport.use('login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    // callback w/ email & password from form
    function(req, email, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                // req.flash is the way to set flashdata using connect-flash
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                // create the loginMessage and save it to session as flashdata
                return done(null, false, req.flash('loginMessage',
                'Oops! Wrong password.'));
            // all is well, return successful user
            return done(null, user);
        });
    }));
};
