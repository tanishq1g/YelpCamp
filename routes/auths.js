var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport')


router.get('/signup',function(req,res){
    res.render('user/signup')
})

router.post('/signup',function(req,res){
    console.log('signup post route')
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log('auth error',err)
            return res.render('user/signup')
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds')
        })
    })
})
module.exports = router;
