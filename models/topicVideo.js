var mongoose = require('mongoose');
var TopicVideo = new mongoose.Schema({
  _id : Number,
  video_id : Number,
  page_video1_id : Number,
  created_at: Date,
  modified_at: Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('topic_video', TopicVideo);
