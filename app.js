var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');



var passport = require('passport')
var localStrategy = require('passport-local')

var User = require('./models/user')



//connecting to database
mongoose.connect("mongodb://localhost/yelp_camp_v");
//setting up all rendered files to be ejs files
app.set('view engine','ejs');
//for post routes
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;

app.use(express.static(__dirname + '/public'));
console.log(__dirname);
seedDB();



// PASSPORT CONFIGURATION

app.use(require('express-session')({
    secret : "passport secret message",
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())





var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');
var authRoutes = require('./routes/auths')



app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/auths', authRoutes);

//landing page
app.get('/',function(req,res){
    res.render("landing",{
        currentUser : req.user
    });
});


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




app.listen(8081, (req, res) => {
    console.log("listening...");
});
