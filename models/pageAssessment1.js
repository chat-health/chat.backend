var mongoose = require('mongoose');
var PageAssessment1 = new mongoose.Schema({
  _id : Number,
  type : String,
  en_content1 : String,
  zu_content1 : String,
  en_content2 : String,
  zu_content2 : String,
  en_content3 : String,
  zu_content3 : String
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('page_assessment1', PageAssessment1);