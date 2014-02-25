var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
var Promise = require('mpromise');

var Client = require('./models/client');
var Household = require('./models/household');
var Service = require('./models/service');
var Visit = require('./models/visit');
var Worker = require('./models/worker');

module.exports = {
  Client: Client,
  Household: Household,
  Service: Service,
  Visit: Visit,
  Worker: Worker,
  
  storeObjIn: function (data, route) {
    var promise;

    // if data is an array we won't work on the data and send a rejected promise
    // This should lead to a 404 back to the server
    if (Array.isArray(data)) {
      promise = new Promise();
      promise.reject(new mongoose.Error("Error: Please don't post multiple documents in an array!"));
    } else {
      // If we only got a object we try to create a document in the DB and return a promise
      if (route === "/clients") {
        promise = Client.create(data);
      } else if (route === "/households") {
        promise = Household.create(data);
      } else if (Service === "/services") {
        promise = Visit.create(data);
      } else if (route === "/visits") {
        promise = Visit.create(data);
      } else if (route === "/workers") {
        promise = Visit.create(data);
      } else {
        // No routing match so we return an error
        promise = new Promise();
        promise.reject(new mongoose.Error("Error: Can't store data for route: "+route));
      }
    }

    return promise;
  }
};

// var storeObjIn = function (data, route) {
//   var promise;

//   // if data is an array we won't work on the data and send a rejected promise
//   // This should lead to a 404 back to the server
//   if (Array.isArray(data)) {
//     promise = new Promise();
//     promise.reject(new MongooseError("Error: Please don't post multiple documents in an array!"));
//   } else {
//     // If we only got a object we try to create a document in the DB and return a promise
//     if (route === "/services") {
//       promise = Service.create(data);
//     } else if (route === "/visits") {
//       promise = Visit.create(data);
//     } else {
//       // No routing match so we return an error
//       promise = new Promise();
//       promise.reject(new MongooseError("Error: Can't store data for route: "+route));
//     }
//   }

//   return promise;
// };