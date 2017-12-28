var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

//setting up all rendered files to be ejs files
app.set('view engine','ejs');

//for post routes
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name: 'Bheemeshwari Jungle Lodges – Karnataka',
//         image: 'https://www.holidify.com/blog/wp-content/uploads/2016/08/bheemeshwari-jungle-lodge.jpg'
//     },
//     function(err, campground){
//
//     }
// )
var campgrounds = [
    {name : 'salman',image : "https://www.holidify.com/blog/wp-content/uploads/2016/08/Tsomoriri.jpg"},
    {name : 'granite',image : "https://www.holidify.com/blog/wp-content/uploads/2016/08/camp-exotica.jpg"},
    {name : 'bolomon',image : "https://www.holidify.com/blog/wp-content/uploads/2016/08/camp-room-on-the-roof.jpg"}
];


app.get('/',function(req,res){
    res.render("landing");
});

app.get('/campgrounds',function(req,res){
    res.render('campgrounds',{campgrounds: campgrounds});
});

app.post('/campgrounds', function(req,res){
    var name = req.body.name;
    var image = req.body.image;

    campgrounds.push({name: name, image: image});
    // res.send('post route');
    res.redirect('campgrounds');
});
// to show the form that will call the post route
app.get('/campgrounds/new',function(req,res){
    res.render('new');
});
app.listen(8081, (req, res) => {
    console.log("listening...");
});
