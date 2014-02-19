var mongoose = require('mongoose');
var Household = new mongoose.Schema({
  _id : Number,
  hh_name : String,
  community : String,
  worker_id : Number
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('Household', Household);