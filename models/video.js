var mongoose = require('mongoose');
var Video = new mongoose.Schema({
  _id : Number,
  name : String,
  uri : String,
  screenshot : String
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('Video', Video);