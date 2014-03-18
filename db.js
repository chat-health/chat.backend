var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
var Promise = require('mpromise');

var Attendance = require('./models/attendance');
var Client = require('./models/client');
var Household = require('./models/household');
var Service = require('./models/service');
var Visit = require('./models/visit');
var Worker = require('./models/worker');
var HealthTheme = require('./models/healthTheme');
var Video = require('./models/video');
var VideoAccessed = require('./models/videoAccessed');
var Resource = require('./models/resource');
var ResourceAccessed = require('./models/resourceAccessed');

var HealthSelect = require('./models/healthSelect');

var PageAssessment1 = require('./models/pageAssessment1');
var Vaccine = require('./models/vaccine');
var VaccineRecorded = require('./models/vaccineRecorded');

var storeObjIn = function (data, collection) {
  var promise;

  // if data is an array we won't work on the data and send a rejected promise
  // This should lead to a 404 back to the server
  if (Array.isArray(data)) {
    promise = new Promise();
    promise.reject(new mongoose.Error("Error: Please don't post multiple documents in an array!"));
  } else {
    var model = getModelFor(collection);
    // If we only got a object we try to create a document in the DB and return a promise
    // if (collection === "attendance") {
    //   promise = Attendance.create(data);
    // } else if (collection === "clients") {
    //   promise = Client.create(data);
    // } else if (collection === "households") {
    //   promise = Household.create(data);
    // } else if (collection === "services") {
    //   promise = Service.create(data);
    // } else if (collection === "visits") {
    //   promise = Visit.create(data);
    // } else if (collection === "workers") {
    //   promise = Worker.create(data);
    // } else if (collection === "health_themes") {
    //   promise = HealthTheme.create(data);
    // } else if (collection === "videos") {
    //   promise = Video.create(data);
    // } else if (collection === "videos_accessed") {
    //   promise = VideoAccessed.create(data);
    // } else if (collection === "resources") {
    //   promise = Resource.create(data);
    // } else if (collection === "resources_accessed") {
    //   promise = ResourceAccessed.create(data);
    // } else if (collection === "health_selects") {
    //   promise = HealthSelect.create(data);
    // } else if (collection === "page_assessment1") {
    //   promise = PageAssessment1.create(data);
    // } else if (collection === "vaccines") {
    //   promise = Vaccine.create(data);
    // } else if (collection === "vaccines_recorded") {
    //   promise = VaccineRecorded.create(data);
    // } else {
    //   // No routing match so we return an error
    //   promise = new Promise();
    //   promise.reject(new mongoose.Error("Error: Can't store data for collection: "+collection));
    // }
    if (model) {
      promise = model.create(data);
    } else {
      // No routing match so we return an error
      promise = new Promise();
      promise.reject(new mongoose.Error("Error: Can't retrieve data for collection: "+collection));
    }
  }

  return promise;
};

var updateDocument = function (collection, data) {
  var promise;
  var model = getModelFor(collection);

  var where = { _id: data._id };
  // Delete _id since that would mess up update
  delete data._id;

  var set = { $set: data}

  if (model) {
    promise = model.update(where, set).exec();
  } else {
    // No routing match so we return an error
    promise = new Promise();
    promise.reject(new mongoose.Error("Error: Can't retrieve data for collection: "+collection));
  }

  return promise;
};

var retrieveFromWhere = function (collection, where) {
  var promise;
  var model = getModelFor(collection);

  // if (collection === "attendance") {
  //   promise = Attendance.find(where).exec();
  // } else if (collection === "clients") {
  //   promise = Client.find(where).exec();
  // } else if (collection === "households") {
  //   promise = Household.find(where).exec();
  // } else if (collection === "services") {
  //   promise = Service.find(where).exec();
  // } else if (collection === "visits") {
  //   promise = Visit.find(where).exec();
  // } else if (collection === "workers") {
  //   promise = Worker.find(where).exec();
  // } else if (collection === "health_themes") {
  //   promise = HealthTheme.find(where).exec();
  // } else if (collection === "videos") {
  //   promise = Video.find(where).exec();
  // } else if (collection === "videos_accessed") {
  //   promise = VideoAccessed.find(where).exec();
  // } else if (collection === "resources") {
  //   promise = Resource.find(where).exec();
  // } else if (collection === "resources_accessed") {
  //   promise = ResourceAccessed.find(where).exec();
  // } else if (collection === "health_selects") {
  //   promise = HealthSelect.find(where).exec();
  // } else if (collection === "page_assessment1") {
  //   promise = PageAssessment1.find(where).exec();
  // } else if (collection === "vaccines") {
  //   promise = Vaccine.find(where).exec();
  // } else if (collection === "vaccines_recorded") {
  //   promise = VaccineRecorded.find(where).exec();
  // } else {
  //   // No routing match so we return an error
  //   promise = new Promise();
  //   promise.reject(new mongoose.Error("Error: Can't retrieve data for collection: "+collection));
  // }
  if (model) {
    promise = model.find(where).exec();
  } else {
    // No routing match so we return an error
    promise = new Promise();
    promise.reject(new mongoose.Error("Error: Can't retrieve data for collection: "+collection));
  }

  return promise;
};

var retrieveAllFrom = function (collection) {
  var where = {};
  return retrieveFromWhere (collection, where);
};

var getModelFor = function(collection) {
  var model = null;
  if (collection === "attendance") {
    model = Attendance;
  } else if (collection === "clients") {
    model = Client;
  } else if (collection === "households") {
    model = Household;
  } else if (collection === "services") {
    model = Service;
  } else if (collection === "visits") {
    model = Visit;
  } else if (collection === "workers") {
    model = Worker;
  } else if (collection === "health_themes") {
    model = HealthTheme;
  } else if (collection === "videos") {
    model = Video;
  } else if (collection === "videos_accessed") {
    model = VideoAccessed;
  } else if (collection === "resources") {
    model = Resource;
  } else if (collection === "resources_accessed") {
    model = ResourceAccessed;
  } else if (collection === "health_selects") {
    model = HealthSelect;
  } else if (collection === "page_assessment1") {
    model = PageAssessment1.find(where).exec();
  } else if (collection === "vaccines") {
    model = Vaccine;
  } else if (collection === "vaccines_recorded") {
    model = VaccineRecorded;
  } else {
    // No routing match so we return null
    model = null;
  }
  return model;
};

module.exports = {
  Attendance: Attendance,
  Client: Client,
  Household: Household,
  Service: Service,
  Visit: Visit,
  Worker: Worker,
  HealthTheme: HealthTheme,
  Video: Video,
  VideoAccessed: VideoAccessed,
  Resource: Resource,
  ResourceAccessed: ResourceAccessed,
  HealthSelect: HealthSelect,
  PageAssessment1: PageAssessment1,
  Vaccine: Vaccine,
  VaccineRecorded: VaccineRecorded,
  storeObjIn: storeObjIn,
  updateDocument: updateDocument,
  retrieveFromWhere: retrieveFromWhere,
  retrieveAllFrom: retrieveAllFrom
};