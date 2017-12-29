//connecting to database
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp");

//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
module.exports = mongoose.model('Campground', campgroundSchema);
