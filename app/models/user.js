/*------------------------------------------------------------------------------
  USER MODEL FILE
------------------------------------------------------------------------------*/

// set up modules ==============================================================
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// SCHEMA for user Model =======================================================
var userSchema = mongoose.Schema({
  local: {
    email     : String,
    password  : String
  }
});

// METHODS =====================================================================
// generating hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create model for users and expose to app
module.exports = mongoose.model('User', userSchema);
