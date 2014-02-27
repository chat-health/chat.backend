var mongoose = require('mongoose');
var VideoAccessed = new mongoose.Schema({
  video_id : Number,
  visit_id : Number
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('VideoAccessed', VideoAccessed);