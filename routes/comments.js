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


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/auths/login')
}

module.exports = router;
