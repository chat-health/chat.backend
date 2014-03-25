var mongoose = require('mongoose');
var ServiceAccessed = new mongoose.Schema({
  _id : Number,
  service_id : Number,
  visit_id : Number,
  client_id : Number,
  ad_info : String,
  date : Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('service_accessed', ServiceAccessed);
