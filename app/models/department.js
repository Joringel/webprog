/*------------------------------------------------------------------------------
  USER MODEL FILE
------------------------------------------------------------------------------*/

// set up modules ==============================================================
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
// module used to count the all users in the collection for departmentnumber
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

// SCHEMA for user Model =======================================================
var departmentSchema = mongoose.Schema({
    departmentname: String,
    departmentnumber: Number

// first department starts w/ number 1
}).plugin(autoIncrement.plugin, {
        model: 'department',
        startAt: 1,
        field: 'departmentnumber'
});

// create model for department and expose to app
module.exports = mongoose.model('Department', departmentSchema);
