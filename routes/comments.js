var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var passport = require('passport')


//NEW - get - to get the form to add new comment and then call the post route
router.get('/new',isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if (err) {
            console.log(err)
        }
        else {
            res.render('comments/new',{
                campground: foundCampground,
                currentUser : req.user
            });
        }
    });
});
//CREATE - POST - add content to db
router.post('/',isLoggedIn, function(req,res){
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

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/auths/login')
}

module.exports = router;
