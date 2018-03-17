var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');


router.use(function(req,res,next){
    res.locals.currentUser = req.user
    next()
})


//INDEX - GET  - displays list of all campgrounds
router.get('/',function(req,res){
    // res.render('campgrounds',{campgrounds: campgrounds});
    //retrieve campgroudns from the database
    Campground.find(function(err,allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            //redirect to campgrounds page
            console.log(req.user);
            res.render('campgrounds/index',{
                campgrounds: allcampgrounds
            });
        }
    });
});

//CREATE - POST - add content to db
router.post('/', function(req,res){
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
            res.redirect('campgrounds/index');
        }
    });
    // campgrounds.push({name: name, image: image});
    // res.redirect('campgrounds');
});

//NEW - GET - /dogs/new - to show the form that will call the post route
router.get('/new',function(req,res){
    res.render('campgrounds/new');
});

//SHOW - GET - shows info about 1 campground
router.get('/:id',function(req,res){
    console.log(req.params.id);
    //find the campground with provided id and then show the prticular campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});

//CREATE - POST - add content to db
router.post('/:id/comments',function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            Comment.create(req.body.comment,function(err,createdComment){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(createdComment);
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();
                    res.redirect('/campgrounds/'+req.params.id);
                }
            });
        }
    });
});



module.exports = router;
