var mongoose = require('mongoose');
var Attendance = new mongoose.Schema({
  _id : Number,
  visit_id : Number,
  client_id : Number
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('Attendance', Attendance);