var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
var Promise = require('mpromise');

var Attendance = require('./models/attendance');
var Client = require('./models/client');
var Household = require('./models/household');
var Service = require('./models/service');
var ServiceAccessed = require('./models/serviceAccessed');
var Visit = require('./models/visit');
var Worker = require('./models/worker');
var HealthTheme = require('./models/healthTheme');
var HealthTopic = require('./models/healthTopic');
var HealthTopicAccessed = require('./models/healthTopicAccessed');
var Video = require('./models/video');
var VideoAccessed = require('./models/videoAccessed');
var Resource = require('./models/resource');
var ResourceAccessed = require('./models/resourceAccessed');

var HealthPage = require('./models/healthPage');
var HealthSelect = require('./models/healthSelect');
var TopicVideo = require('./models/topicVideo');
var PageText1 = require('./models/pageText1');
var PageSelect1 = require('./models/pageSelect1');
var PageVideo1 = require('./models/pageVideo1');
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

  // update statement
  var set = { $set: data };

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
  } else if (collection === "services_accessed") {
    model = ServiceAccessed;
  } else if (collection === "visits") {
    model = Visit;
  } else if (collection === "workers") {
    model = Worker;
  } else if (collection === "health_themes") {
    model = HealthTheme;
  } else if (collection === "health_topics") {
    model = HealthTopic;
  } else if (collection === "health_topics_accessed") {
    model = HealthTopicAccessed;
  } else if (collection === "videos") {
    model = Video;
  } else if (collection === "videos_accessed") {
    model = VideoAccessed;
  } else if (collection === "resources") {
    model = Resource;
  } else if (collection === "resources_accessed") {
    model = ResourceAccessed;
  } else if (collection === "health_pages") {
    model = HealthPage;
  } else if (collection === "health_selects") {
    model = HealthSelect;
  } else if (collection === "topic_videos") {
    model = TopicVideo;
  } else if (collection === "page_text1") {
    model = PageText1;
  } else if (collection === "page_select1") {
    model = PageSelect1;
  } else if (collection === "page_video1") {
    model = PageVideo1;
  } else if (collection === "page_assessment1") {
    model = PageAssessment1;
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
  ServiceAccessed: ServiceAccessed,
  Visit: Visit,
  Worker: Worker,
  HealthTheme: HealthTheme,
  HealthTopic: HealthTopic,
  HealthTopicAccessed: HealthTopicAccessed,
  Video: Video,
  VideoAccessed: VideoAccessed,
  Resource: Resource,
  ResourceAccessed: ResourceAccessed,
  HealthPage: HealthPage,
  HealthSelect: HealthSelect,
  TopicVideo: TopicVideo,
  PageText1: PageText1,
  PageSelect1: PageSelect1,
  PageVideo1: PageVideo1,
  PageAssessment1: PageAssessment1,
  Vaccine: Vaccine,
  VaccineRecorded: VaccineRecorded,
  storeObjIn: storeObjIn,
  updateDocument: updateDocument,
  retrieveFromWhere: retrieveFromWhere,
  retrieveAllFrom: retrieveAllFrom
};
