var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');


router.use(function(req,res,next){
    res.locals.currentUser = req.user
    next()
})

//NEW - get - to get the form to add new comment and then call the post route
router.get('/new',isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if (err) {
            console.log(err)
        }
        else {
            res.render('comments/new',{
                campground: foundCampground
            });
        }
    });
});

router.get('/:comment_id/edit',function(req,res){
    console.log('edit route for comment',req.params);
    Campground.findById(req.params.id, function(err,foundCampground){
        if (err) {
            console.log("error finding campground",err)
        }
        else {
            console.log(foundCampground);
            Comment.findById(req.params.comment_id, function(err,foundComment){
                if (err) {
                    console.log("error finding campground",err)
                    res.redirect("back")
                }
                else {
                    console.log(foundCampground,foundComment);
                    res.render('comments/edit',{
                        campground: foundCampground,
                        comment : foundComment
                    });
                }
            });
        }
    });
})

router.put('/:comment_id',function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/auths/login')
}

module.exports = router;
