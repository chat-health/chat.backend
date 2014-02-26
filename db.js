var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
var Promise = require('mpromise');

var Attendance = require('./models/attendance');
var Client = require('./models/client');
var Household = require('./models/household');
var Service = require('./models/service');
var Visit = require('./models/visit');
var Worker = require('./models/worker');

module.exports = {
  Attendance: Attendance,
  Client: Client,
  Household: Household,
  Service: Service,
  Visit: Visit,
  Worker: Worker,
  
  storeObjIn: function (data, collection) {
    var promise;

    // if data is an array we won't work on the data and send a rejected promise
    // This should lead to a 404 back to the server
    if (Array.isArray(data)) {
      promise = new Promise();
      promise.reject(new mongoose.Error("Error: Please don't post multiple documents in an array!"));
    } else {
      // If we only got a object we try to create a document in the DB and return a promise
      if (collection === "attendance") {
        promise = Attendance.create(data);
      } else if (collection === "clients") {
        promise = Client.create(data);
      } else if (collection === "households") {
        promise = Household.create(data);
      } else if (Service === "services") {
        promise = Visit.create(data);
      } else if (collection === "visits") {
        promise = Visit.create(data);
      } else if (collection === "workers") {
        promise = Visit.create(data);
      } else {
        // No routing match so we return an error
        promise = new Promise();
        promise.reject(new mongoose.Error("Error: Can't store data for collection: "+collection));
      }
    }

    return promise;
  },

  retrieveAllFrom: function (collection) {
    var promise;

    if (collection === "attendance") {
      promise = Attendance.find().exec();
    } else if (collection === "clients") {
      promise = Client.find().exec();
    } else if (collection === "households") {
      promise = Household.find().exec();
    } else if (Service === "services") {
      promise = Visit.find().exec();
    } else if (collection === "visits") {
      promise = Visit.find().exec();
    } else if (collection === "workers") {
      promise = Visit.find().exec();
    } else {
      // No routing match so we return an error
      promise = new Promise();
      promise.reject(new mongoose.Error("Error: Can't retrieve data for collection: "+collection));
    }

    return promise;
  }
};