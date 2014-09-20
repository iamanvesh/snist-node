var mongoose = require('mongoose'),
	Hash	 = require('password-hash'),
	Schema 	 = mongoose.Schema;

var userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required:true,
		set: function(myPassword){
			return Hash.isHashed(myPassword) ? myPassword : Hash.generate(myPassword);
		}
	}
});

userSchema.statics.authenticate = function(email, password, callback){
	this.findOne({email: email}, function(error, user){
		if(user && Hash.verify(password, user.password))
			callback(null, user);
		else if(user || !error){
			error = new Error("Incorrect username or password");
			callback(error, false);
		}
		else
			callback(error, false);
	});
};

module.exports = mongoose.model('User', userSchema);