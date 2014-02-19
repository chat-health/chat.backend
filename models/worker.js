var mongoose = require('mongoose');
var Worker = new mongoose.Schema({
  _id : Number,
  first_name : String,
  last_name : String,
  password : String,
  role_name : String,
  assigned_community: String
});
module.exports = mongoose.model('Worker', Worker);