// requiring review model
const Review = require('../models/reviews');

module.exports.root_get = (req,res) => {
	res.render('index', { tabTitle: 'TakeOut' });
}

module.exports.root_post = (req,res) => {
	Review.create(req.body)

	.then(result => {
		res.render('index', { tabTitle: 'TakeOut' });
	})

	.catch(err => {
		console.log('Posting Review Failed | Empty Input');
		res.redirect('/');
	})
}