var mongoose = require('mongoose');
var HealthSelect = new mongoose.Schema({
  _id : Number,
  subject_id : Number,
  en_content : String,
  zu_content : String,
  created_at: Date,
  modified_at: Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('health_select', HealthSelect);
