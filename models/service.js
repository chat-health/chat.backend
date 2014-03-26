var mongoose = require('mongoose');
var Service = new mongoose.Schema({
  _id : Number,
  name : String,
  type : String,
  role : String,
  instructions : String,
  created_at: Date,
  modified_at: Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('Service', Service);
