//connecting to database
var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/yelp_camp");

//SCHEMA setup
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});
module.exports = mongoose.model('Comment', commentSchema);
