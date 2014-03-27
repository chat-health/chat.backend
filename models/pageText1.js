var mongoose = require('mongoose');
var PageText1 = new mongoose.Schema({
  _id : Number,
  en_content1 : String,
  zu_content1 : String,
  en_content2 : String,
  zu_content2 : String,
  created_at: Date,
  modified_at: Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('page_text1', PageText1);
