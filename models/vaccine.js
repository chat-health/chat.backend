var mongoose = require('mongoose');
var Vaccine = new mongoose.Schema({
  _id : Number,
  age : String,
  display_age : String,
  short_name : String,
  long_name : String
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('Vaccine', Vaccine);