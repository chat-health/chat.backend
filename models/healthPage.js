var mongoose = require('mongoose');
var HealthPage = new mongoose.Schema({
  _id : Number,
  topic_id : Number,
  page_number : Number,
  type : String,
  page_content_id : Number,
  created_at: Date,
  modified_at: Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('health_page', HealthPage);
