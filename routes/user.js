var User = require('../models/Users');

exports.list = function(req, res){
	User.find(function(error, users){
		if(error)
			console.log(error);
		else
			res.render('allnews', {
				title: "Users",
				posts: users
			});
	});
};