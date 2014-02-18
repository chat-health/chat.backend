var mongoose = require('mongoose');
var Client = new mongoose.Schema({
  _id : Number,
  first_name : String,
  last_name : String,
  hh_id : Number,
  gender : String,
  date_of_birth: String
});
module.exports = mongoose.model('Client', Client);