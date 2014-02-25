var mongoose = require('mongoose');
var Visit = new mongoose.Schema({
  _id : Number,
  name : String
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('Visit', Visit);