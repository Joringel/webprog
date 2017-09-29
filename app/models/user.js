/*------------------------------------------------------------------------------
  USER MODEL FILE
------------------------------------------------------------------------------*/

// set up modules ==============================================================
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
// module used to count the all users in the collection for employeenumber
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

// SCHEMA for user Model =======================================================
var userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true
    },
    password: String,
    plainpassword: String,
    username: String,
    name: {
        firstname: String,
        lastname: String
    },
    location: {
        street: String,
        postcode: {
            type: String,
            minlength: 5,
            maxlength: 5
         }
    },
    employeenumber: Number,
    departmentnumber: Number,
    is_admin: {
        type: Number,
        default: 0
    }
}).plugin(autoIncrement.plugin, {
        model: 'User',
        startAt: 1,
        field: 'employeenumber'
});

// METHODS =====================================================================
// generating hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create model for users and expose to app
module.exports = mongoose.model('User', userSchema);


//
// var mongoose = require('mongoose');
//
// var adminSchema = mongoose.Schema({ // required for the application, not for the actual database
//       name: {
//         type: String,
//         required: true
//       },
//       password: {
//         type: String,
//         required: true
//       },
//       create_date:{
//         type: Date,
//         default: Date.nows
//       }
// });
//
// var Admin = module.exports = mongoose.model('Admin', adminSchema);
//
//
// module.exports.getAdmins = function(callback, limit){ // get all Admins
//       Admin.find(callback).limit(limit);
// }
//
// module.exports.getAdminById = function(id, callback){ // get Admin
//       Admin.findById(id, callback);
// }
//
// module.exports.addAdmin = function(admin, callback){ // add Admin
//       Admin.create(admin, callback);
// }
//
// module.exports.updateAdmin = function(id, admin, options, callback){ // update Admin with id, admin-object, options and callback
//       var query = {
//             _id: id
//       };
//       var update = { // assign each field
//             name: admin.name,
//             password: admin.password
//       }
//       Admin.findOneAndUpdate(query, update, options, callback);
// }
//
// module.exports.removeAdmin = function(id, callback){ // delete Admin
//       var query = {
//             _id: id
//       };
//       Admin.remove(query, callback);
// }
