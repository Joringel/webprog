/*------------------------------------------------------------------------------
 PROJECT MODEL FILE
------------------------------------------------------------------------------*/

// set up modules ==============================================================
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
// module used to count the all users in the collection for projectnumber
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

// SCHEMA for user Model =======================================================
var projectSchema = mongoose.Schema({
    projectnumber: String,
    projecttext: String,
    projectname: String,
    projectowner: String

// first Project starts w/ number 1
}).plugin(autoIncrement.plugin, {
        model: 'project',
        startAt: 1,
        field: 'number'
});

// create model for Project and expose to app
module.exports = mongoose.model('Project', projectSchema);
