const Staff = require('../models/staffs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const maxAge = 3 * 24 * 60 * 60
const createToken = id => {
	return jwt.sign({ id }, process.env.STAFF_TOKEN, {
		expiresIn: maxAge
	})
}

module.exports.staff_get_signup = (req, res) => {
	res.render('signup', { tabTitle: 'Signup' });
}

module.exports.staff_get_login = (req, res) => {
	res.render('login', { tabTitle: 'Login' });
}

module.exports.staff_post_signup = async (req, res) => {
	const { username, password } = req.body;
	await Staff.create({ username, password })

	.then(data => {
		const token = createToken(data._id);
		res.cookie('webtoken', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.json(data);
	})

	.catch(err => {
		let errors = {
			username: "",
			password: ""
		}

		if (err.hasOwnProperty('code')) {
			if (err.code === 11000) {
				res.json({ error: "Username already exist" })
			}
		} else if (err.hasOwnProperty('errors')) {
			if (err.errors.hasOwnProperty('username') && err.errors.hasOwnProperty('password')) {
				errors.username = { message } = err.errors.username.properties;
				errors.password = { message } = err.errors.password.properties;
			} else if (err.errors.hasOwnProperty('username')) {
				errors.username = { message } = err.errors.username.properties;
				errors.password = { message } = "";
			} else if (err.errors.hasOwnProperty('password')) {
				errors.username = { message } = "";
				errors.password = { message } = err.errors.password.properties;
			}
			res.json(errors);
		} else {
			res.json({ nothing: "here" })
		}			
	})
}

module.exports.staff_post_login = (req, res) => {
	const { username, password } = req.body;

	const getData = async function() {
		const staff = await Staff.login(username, password)
		return staff;
	}

	getData()

	.then(data => {
		const token = createToken(data._id);
		res.cookie('webtoken', token, { httpOnly: true, maxAge: maxAge * 1000 });
		const dataBack = { _id: data._id, username };
		res.json(dataBack);
	})

	.catch(err => {
		res.status(400).json(err.message);
	})
}

module.exports.staff_post_logout = (req, res) => {
	res.cookie('webtoken', '', { maxAge: 1 });
	res.redirect('/');
}