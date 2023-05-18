const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
	const token = req.cookies.webtoken;

	if (token) {
		jwt.verify(token, process.env.STAFF_TOKEN, (err, decoded) => {
			if (err) {
				res.redirect('/staffs/login');
			} else {
				next();
			}
		})
	} else {
		res.redirect('/staffs/login');
	}
}

module.exports = { requireAuth };