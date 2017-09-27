

var mongoose = require('mongoose');

var normalUserSchema = mongoose.Schema({ // required for the application, not for the actual database
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      firstname: String,
      lastname: String,
      postcode: {
        type: Number,
        required: true
      },
      create_date:{
        type: Date,
        default: Date.nows
      }
});

// module.exports to use it outside
var NormalUser = module.exports = mongoose.model('NormalUser', normalUserSchema);


module.exports.getNormalUsers = function(callback, limit){ // get all NormalUsers
      NormalUser.find(callback).limit(limit);
}

module.exports.getNormalUserById = function(id, callback){ // get NormalUser
      NormalUser.findById(id, callback);
}

module.exports.addNormalUser = function(normalUser, callback){ // add NormalUser
      NormalUser.create(normalUser, callback);
}

module.exports.updateNormalUser = function(id, normalUser, options, callback){ // update normalUser with id, normalUser-object, options and callback
      var query = {
            _id: id
      };
      var update = { // assign each field
            username: normalUser.username,
            password: normalUser.password,
            firstname: normalUser.firstname,
            lastname: normalUser.lastname,
            postcode: normalUser.postcode
      }
      NormalUser.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeNormalUser = function(id, callback){ // delete NormalUser
      var query = {
            _id: id
      };
      NormalUser.remove(query, callback);
}
