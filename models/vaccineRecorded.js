var mongoose = require('mongoose');
var VaccineRecorded = new mongoose.Schema({
  vaccine_id : Number,
  client_id : Number,
  visit_id : Number,
  date : String
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('VaccineRecorded', VaccineRecorded);