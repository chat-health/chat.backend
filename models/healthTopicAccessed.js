var mongoose = require('mongoose');
var HealthTopicAccessed = new mongoose.Schema({
  _id: Number,
  topic_id : Number,
  visit_id : Number,
  hh_id : Number,
  topic_name : String,
  start_time : String,
  end_time : String
}, { versionKey: false, collection: 'health_topics_accessed' });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('health_topic_accessed', HealthTopicAccessed);
