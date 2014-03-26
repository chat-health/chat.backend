var mongoose = require('mongoose');
var HealthTopicAccessed = new mongoose.Schema({
  vaccine_id : Number,
  client_id : Number,
  visit_id : Number,
  date : String
}, { versionKey: false, collection: 'health_topics_accessed' });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('health_topic_accessed', HealthTopicAccessed);
