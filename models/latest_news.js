var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var postSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	createdBy: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Post', postSchema);