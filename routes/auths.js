var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport')


router.get('/signup',function(req,res){
    res.render('user/signup',{
        currentUser : req.user
    })
})

router.post('/signup',function(req,res){
    console.log('signup post route')
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log('auth error',err)
            return res.render('user/signup',{
                currentUser : req.user
            })
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds')
        })
    })
})


//LOGIN ROUTES

router.get('/login',function(req,res){
    res.render('user/login',{
        currentUser : req.user
    })
})

    //middleware
router.post('/login', passport.authenticate('local' ,{
    successRedirect : '/campgrounds',
    failureRedirect : '/auths/login'
}),function(req,res){

})


//LOGOUT ROUTES

router.get('/logout',function(req,res){
    req.logout()
    res.redirect('/')
})


module.exports = router;
