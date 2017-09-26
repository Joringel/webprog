

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      password: {
        type: String
      },
      create_date:{
        type: Date,
        default: Date.nows
      }
});

var User = module.exports = mongoose.model('User', userSchema); // module.exports to make it accessible from outside


module.exports.getUsers = function(callback, limit){ // get all Users
      User.find(callback).limit(limit);
}

module.exports.getUserById = function(id, callback){ // get User
      User.findById(id, callback);
}

module.exports.addUser = function(user, callback){ // add User
      User.create(user, callback);
}

module.exports.updateUser = function(id, user, options, callback){ // update User
      var query = {
            _id: id
      };
      var update = {
            name: user.name,
            password: user.password
      }
      User.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeUser = function(id, callback){ // delete User
      var query = {
            _id: id
      };
      User.remove(query, callback);
}
