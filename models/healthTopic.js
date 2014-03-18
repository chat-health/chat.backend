var mongoose = require('mongoose');
var HealthTopic = new mongoose.Schema({
  _id : Number,
  name : String,
  theme : String
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('health_topic', HealthTopic);
