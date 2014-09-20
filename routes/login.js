module.exports = function(app, passport){
	app.get('/AdminLogin', function(req, res){
		res.render('adminlogin', {title: "Admin Login"});
	});

	app.get('/AdminRegistration', function(req,res){
		res.render('registeradmin', { title: "Admin Registration" });
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.post('/AdminAuth', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/AdminLogin',
		failureFlash: true
	}));

	app.post('/NewAdminRegistration', passport.authenticate('local-signup', {
		successRedirect: '/news',
		failureRedirect: '/AdminRegistration', 
		failureFlash: true
	}));
}
