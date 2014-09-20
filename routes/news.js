module.exports = function(app, passport){
	var Post = require('../models/latest_news');

	app.get('/news', function(req, res) {
		Post.find(function(err, posts) {
			if(err)
				console.log(err);
			else
				res.render('allnews', {
					title : "All Posts",
					posts : posts
				});
		});
	});

	// New Post form (Authentication needed)
	app.get('/new', isLoggedIn, function(req, res) {
		res.render('new_post', {
			title: "Add New Post"
		});
	});

	app.post('/add_new_post', isLoggedIn, function(req, res) {
		var post = new Post({
			title : req.body.post_title,
			body : req.body.post_body,
			slug : req.body.post_slug,
			createdBy : req.user.email
		});
		post.save( function(err) {
			if(err)
				console.log(err);
			else
				res.redirect('/news');
		});
	});

	app.get('/posts/:slug', function(req, res) {
		Post.findOne({
			slug: req.params.slug
		}, function(err, post) {
			res.render('post', {
				post: post
			});
		});
	});

	function isLoggedIn(req, res, next){
		if(req.isAuthenticated())
			return next();
		res.redirect('/AdminLogin');
	}
}