// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose'); // load the mongoose module
//
// mongoose.connect('mongodb://localhost/webprog'); // connection with a mongoDB Protocol to talk to the mongoDB, because we using the default port: 27017 we dont have to specify it here
//
// var mySchema = mongoose.Schema({ // schema
//   firstname: String,
//   lastname: String
// });
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Webprog' });
// });

// we only create new instances when we add with a post request new data to the db

// var ChoiceModel = mongoose.model('choices', mySchema); // the clas ChoiceModel is a model that defines the collection name 'choices' and the Schema 'mySchema'
//
// var newChoice = new ChoiceModel(); // new instance newChoice of the model ChoiceModel. This Object will be saved in the choices collection.
// newChoise.firstname = firstname; // assign object.key  tho the new firstname variable
// newChoice.lastname = lastname;
// newChoice.save(function(err, savedObject){ // saved
//   if(err){
//     console.log(err);
//     res.status(500).send();
//   } else {
//     res.send(savedObject);
//   }
// });
//
// else {
//   res.status(400).send(); // bad request if something was typed in wrong, client error. // 404 server hasn't found the object the client was looking for // 401 unauthorized // 403 forbidden
// }

// when we want to get something from the database
// ChoiceModel.find({}, function(err, foundData){
//   if(err){
//     console.log(err);
//     res.status(500).send();
//   } else {
//       var select = req.query.select;
//       if(foundData.length == 0){
//         var responseObject = undefined;
//         if(select && select == 'count'){ // if select is set and defined as count --> /likes?select=count
//           responseObject = {count: 0};
//         }
//         res.status(404).send(responseObject);
//       } else { // if the foundData.length is not 0.
//         var responseObject = foundData;
//         if(select && select == 'count'){
//           responseObject = {count: foundData.length};
//         }
//         res.send(responseObject);
//       }
//     });
//
//   }
// });




// send header

// router.get('/likes', function(req, res){
//   var logvalue = req.headers['log'];
//   if(logvalue && logvalue == 'info'){
//     console.log("Request received for /likes.");
//   }
// query strings



//module.exports = router;
