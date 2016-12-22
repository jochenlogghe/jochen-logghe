var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(error, user){
            done(error, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
       usernameField: 'email',
       passwordField: 'password',
       passReqToCallback: true 
    }, function(request, email, password, done){
        if(email){
            email = email.toLowerCase();
        }

        process.nextTick(function(){
            User.findOne({ 'local.email': email }, function(error, user){
                if(error) return done(error);

                if(!user){
                    return done(null, false, request.flash('loginMessage', 'No User Found'));
                }
                
                if(!user.validPassword(password)){
                    return done(null, false, request.flash('loginMessage', 'Wrong Password'));
                }else{
                    return done(null, user);
                }
            });
        });
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordFied: 'password',
        passReqToCallback: true
    }, function(request, email, password, done){
        if(email){
            email = email.toLowerCase();
        }

        process.nextTick(function(){
            if(!request.user){
                User.findOne({ 'local.email': email, function(error, user){
                    if(error) return done(error);

                    if(user){
                        return done(null, false, request.flash('signupMessage', 'E-mail already taken'));
                    }else{
                        var user = new User();
                        user.local.email = email;
                        user.local.password = user.generateHash(password);

                        user.save(function(error){
                            if(error) throw error;
                            return done(null, user);
                        });
                    }
                }});
            }else{
                return done(null, request.user);
            }
        });
    }));
};