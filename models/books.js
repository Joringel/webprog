var mongoose = require('mongoose');


// a schema isnt required for the actual database this is for the application
var bookSchema = mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      genre: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      author: {
        type: String
      },
      pages: {
        type: String
      },
      image_url: {
        type: String
      },
      create_date:{
        type: Date,
        default: Date.nows
      }
});

// module.exports so its accessible from outside
var Book = module.exports = mongoose.model('Book', bookSchema);

// get Books
module.exports.getBooks = function(callback, limit){
      Book.find(callback).limit(limit);
}
// get Book
module.exports.getBookById = function(id, callback){
      Book.findById(id, callback);
}
// add a Book
module.exports.addBook = function(book, callback){
      Book.create(book, callback);
}

// update Book
module.exports.updateBook = function(id, book, options, callback){
      var query = {
            _id: id
      };
      var update = {
            title: book.title,
            genre: book.genre,
            description: book.description,
            author: book.author,
            pages: book.pages,
            image_url: book.image_url
      }
      Book.findOneAndUpdate(query, update, options, callback);
}

// delete Book
module.exports.removeBook = function(id, callback){
      var query = {
            _id: id
      };
      Book.remove(query, callback);
}
