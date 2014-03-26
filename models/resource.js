var mongoose = require('mongoose');
var Resource = new mongoose.Schema({
  _id : Number,
  name : String,
  uri : String,
  created_at: Date,
  modified_at: Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('Resource', Resource);
