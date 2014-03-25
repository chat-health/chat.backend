var mongoose = require('mongoose');
var ServiceAccessed = new mongoose.Schema({
  service_id : Number,
  visit_id : Number,
  client_id : Number,
  ad_info : String,
  date : Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('resource_accessed', ResourceAccessed);