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
router.post('/',isLoggedIn,  function(req,res){
    console.log('campground create post route');
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampground = {name: name, image: image, description : desc, author: author};
    //create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("error in creating campground",err);
        }
        else{
            console.log('campground created successfully',newlyCreated);
            res.redirect('/campgrounds/');
        }
    });
    // campgrounds.push({name: name, image: image});
    // res.redirect('campgrounds');
});

//NEW - GET - /dogs/new - to show the form that will call the post route
router.get('/new',isLoggedIn, function(req,res){
    res.render('campgrounds/new');
});

//SHOW - GET - shows info about 1 campground
router.get('/:id',function(req,res){
    // console.log(req.params.id);
    //find the campground with provided id and then show the prticular campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});

//CREATE - POST - add content to db
router.post('/:id/comments',function(req,res){
    console.log('comment add post route');
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
                    createdComment.author.id = req.user._id
                    createdComment.author.username = req.user.username
                    createdComment.save()
                    console.log(createdComment);
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();
                    res.redirect('/campgrounds/'+req.params.id);
                }
            });
        }
    });
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/auths/login')
}

module.exports = router;
