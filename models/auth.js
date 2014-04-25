var mongoose = require('mongoose');
var Auth = new mongoose.Schema({
  _id : Number,
  email : String,
  google_access_token : String,
  deviceid : String,
  created_at: Date,
  modified_at: Date
}, { versionKey: false, collection: 'authorization' });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('auth', Auth);