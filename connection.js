const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

module.exports = async () => {
	await mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
	return mongoose;
}