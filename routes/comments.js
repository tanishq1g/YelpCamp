var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');


//NEW - get - to get the form to add new comment and then call the post route
router.get('/new',function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if (err) {
            console.log(err)
        }
        else {
            res.render('comments/new',{campground: foundCampground});
        }
    });
});
//CREATE - POST - add content to db
router.post('/',function(req,res){
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
