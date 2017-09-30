

var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({ // required for the application, not for the actual database
      name: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      create_date:{
        type: Date,
        default: Date.nows
      }
});

var Admin = module.exports = mongoose.model('Admin', adminSchema);


module.exports.getAdmins = function(callback, limit){ // get all Admins
      Admin.find(callback).limit(limit);
}

module.exports.getAdminById = function(id, callback){ // get Admin
      Admin.findById(id, callback);
}

module.exports.addAdmin = function(admin, callback){ // add Admin
      Admin.create(admin, callback);
}

module.exports.updateAdmin = function(id, admin, options, callback){ // update Admin with id, admin-object, options and callback
      var query = {
            _id: id
      };
      var update = { // assign each field
            name: admin.name,
            password: admin.password
      }
      Admin.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeAdmin = function(id, callback){ // delete Admin
      var query = {
            _id: id
      };
      Admin.remove(query, callback);
}
