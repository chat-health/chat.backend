var mongoose = require('mongoose');
var Worker = new mongoose.Schema({
  _id : Number,
  first_name : String,
  last_name : String,
  username : String,
  password : String,
  role_name : String,
  assigned_community: String,
  phone_number: Number,
  created_at: Date,
  modified_at: Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('Worker', Worker);
