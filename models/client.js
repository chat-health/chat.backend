var mongoose = require('mongoose');
var Client = new mongoose.Schema({
  _id : Number,
  first_name : String,
  last_name : String,
  hh_id : Number,
  gender : String,
  date_of_birth: Date,
  created_at: Date,
  modified_at: Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('client', Client);
