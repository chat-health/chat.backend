var mongoose = require('mongoose');
var PageSelect1 = new mongoose.Schema({
  _id : Number,
  en_content1 : String,
  zu_content1 : String,
  created_at: Date,
  modified_at: Date
}, { versionKey: false });
// Hiding __v - version key http://stackoverflow.com/questions/13699784/mongoose-v-property-hide
module.exports = mongoose.model('page_select1', PageSelect1);
