const Staff = require('../models/staffs');
const Review = require('../models/reviews');
const Order = require('../models/orders');

module.exports.panel_get = (req, res) => {
	Order.find()

	.then(orders => {
		res.render('panel', { tabTitle: 'Panel', orders });
	})

	.catch(err => {
		res.status(400).redirect('/panel/orders');
	})
}

module.exports.panel_reviews_get = (req, res) => {
	Review.find()

	.then(reviews => {
		res.render('panelreviews', { tabTitle: 'Reviews' , reviews});
	})

	.catch(err => {
		console.log(err);
	})

}

module.exports.panel_reviews_post = (req, res) => {
	const reviewId = req.params.id;
	Review.findByIdAndDelete({ _id: reviewId })

	.then(data => {
		res.redirect('/panel/reviews');
	})

	.catch(err => {
		console.log(err);
	})
}

module.exports.panel_orders_get = (req, res) => {
	Order.find().sort({ createdAt: -1 })

	.then(orders => {
		res.render('panelorders', { tabTitle: 'Orders' , orders});
	})

	.catch(err => {
		console.log(err);
	})
}

module.exports.panel_orders_post = (req, res) => {
	const orderId = req.params.id;

	Order.findByIdAndUpdate(orderId, req.body)

	.then(data => {
		res.redirect('/panel/orders');
	})

	.catch(err => {
		res.status(400).redirect('/panel/orders');
	})
}
