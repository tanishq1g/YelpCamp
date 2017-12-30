var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');

//connecting to database
mongoose.connect("mongodb://localhost/yelp_camp_v");
//setting up all rendered files to be ejs files
app.set('view engine','ejs');
//for post routes
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;



seedDB();

// seedDB();
// adds to database
// Campground.create(
//     // {
//     //     name: 'Bheemeshwari Jungle Lodges – Karnataka',
//     //     image: 'https://www.holidify.com/blog/wp-content/uploads/2016/08/bheemeshwari-jungle-lodge.jpg'
//     // },
//     {
//         name : 'Tsomoriri',
//         image : "https://www.holidify.com/blog/wp-content/uploads/2016/08/Tsomoriri.jpg",
//         description: 'this is a huge green hill. beautiful, scenic'
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("newly created campground");
//             console.log(campground);
//         }
//     }
// );
// var campgrounds = [
//     {name : 'salman',image : "https://www.holidify.com/blog/wp-content/uploads/2016/08/Tsomoriri.jpg"},
//     {name : 'granite',image : "https://www.holidify.com/blog/wp-content/uploads/2016/08/camp-exotica.jpg"},
//     {name : 'bolomon',image : "https://www.holidify.com/blog/wp-content/uploads/2016/08/camp-room-on-the-roof.jpg"}
// ];



//landing page
app.get('/',function(req,res){
    res.render("landing");
});


//INDEX - GET - /dogs - displays list of all campgrounds
app.get('/campgrounds',function(req,res){
    // res.render('campgrounds',{campgrounds: campgrounds});
    //retrieve campgroudns from the database
    Campground.find(function(err,allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            //redirect to campgrounds page
            res.render('index',{campgrounds: allcampgrounds});
        }
    });
});

//CREATE - POST - /dogs -add conent to db
app.post('/campgrounds', function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description : desc};
    //create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('index');
        }
    });
    // campgrounds.push({name: name, image: image});
    // res.redirect('campgrounds');
});

//NEW - GET - /dogs/new - to show the form that will call the post route
app.get('/campgrounds/new',function(req,res){
    res.render('new');
});

//SHOW - GET - /dogs/:id - shows info about 1 dog
app.get('/campgrounds/:id',function(req,res){
    console.log(req.params.id);
    //find the campground with provided id and then show the prticular campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show", {
                campground: foundCampground
            });
        }
    });
});





app.listen(8081, (req, res) => {
    console.log("listening...");
});
