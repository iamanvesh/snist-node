var User = require('../models/Users');
var PassportLocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(error, user){
			done(error, user);
		});
	});

	passport.use('local-signup', new PassportLocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
		}, function(req, email, password, done){
			// Asynchronous 
			process.nextTick(function(){
				if(!req.user){
					User.findOne({email: email}, function(err, user){
						if(err)
							console.log(err);
						if(user)
							return done(null, false, req.flash('signUpMessage', 'That email is already taken'));
						else{
							var newUser = new User({
								email: email,
								password: password
							});
							newUser.save(function(err){
								if(err)
									console.log(err);
								else
									return done(null, newUser);
							});
						}
					});
				}
				else{
					req.logout();
				}				
			});
		}
	));

	passport.use('local-login', new PassportLocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
		}, function(req, email, password, done){
			User.authenticate(email, password, function(error, user){
				if(error)
					return done(null, false, req.flash('loginMessage', error.message));
				else
					return done(null, user);
			});
		}
	));
};