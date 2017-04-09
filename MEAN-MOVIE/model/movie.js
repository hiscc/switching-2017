var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//more schema guide : http://mongoosejs.com/docs/guide.html
var movieSchema = new  Schema({
  title: String,
  director: String
});

module.exports = mongoose.model('Movie', movieSchema);
