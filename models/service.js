var mongoose = require('mongoose');
var Service = new mongoose.Schema({
  _id : Number,
  name : String,
  type : String,
  role : String,
  instructions : String
});
module.exports = mongoose.model('Service', Service);