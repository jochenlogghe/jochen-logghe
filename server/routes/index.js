var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home */
router.get('/', function(request, response){
    response.render('index.ejs');
});

/* GET profile */
router.get('/profile', isLoggedIn, function(request, response){
    response.render('profile.ejs',{
      user: request.user
    });
});

/* GET logout */
router.get('/logout', function(request, response){
    request.logout();
    response.redirect('/');
});

/* GET login */
router.get('/login', function(request, response){
    response.render('login.ejs', { message: request.flash('loginMessage') });
});

/* POST login */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

/* GET signup */
router.get('/signup', function(request, response){
    response.render('signup.ejs', { message: request.flash('signupMessage') });
});

/* POST signup */
router.post('/signup', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));


function isLoggedIn(request, response, next){
    if(request.isAuthenticated()){
      return next();
    }

    res.redirect('/');
}

module.exports = router;
