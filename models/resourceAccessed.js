var mongoose = require('mongoose');
var ResourceAccessed = new mongoose.Schema({
  _id : Number,
  resource_id : Number,
  visit_id : Number,
  worker_id : Number,
  date : String
}, { versionKey: false, collection: 'resources_accessed' });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('resource_accessed', ResourceAccessed);
