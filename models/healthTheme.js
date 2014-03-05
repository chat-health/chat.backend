var mongoose = require('mongoose');
var HealthTheme = new mongoose.Schema({
  _id : Number,
  name : String,
  en_observe_content : String,
  en_record_content : String,
  zu_observe_content : String,
  zu_record_content : String,
  color: String
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('health_theme', HealthTheme);