var mongoose = require('mongoose');


// a schema isnt required for the actual database this is for the application
var genreSchema = mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      create_date:{
        type: Date,
        default: Date.nows
      }
});

// module.exports so its accessible from outside
var Genre = module.exports = mongoose.model('Genre', genreSchema);

// get Genres
module.exports.getGenres = function(callback, limit){
      Genre.find(callback).limit(limit);
}
// add Genre. takes in a genre-object which will be data from a form
module.exports.addGenre = function(genre, callback){
      Genre.create(genre, callback);
}

// update Genre it takes an id, the genre object, options and a callback
module.exports.updateGenre = function(id, genre, options, callback){

      var query = {
            _id: id
      };
      // we have to asssign each field
      var update = {
            name: genre.name
      }
      Genre.findOneAndUpdate(query, update, options, callback);
}

// delete Genre
module.exports.removeGenre = function(id, callback){
      var query = {
            _id: id
      };
      Genre.remove(query, callback);
}
