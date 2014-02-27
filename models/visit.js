var mongoose = require('mongoose');
var Visit = new mongoose.Schema({
  _id : Number,
  worker_id : Number,
  role: String,
  date: Date,
  hh_id: Number,
  lat: Number,
  lon: Number,
  start_time: Date,
  end_time: Date,
  type: String
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('Visit', Visit);