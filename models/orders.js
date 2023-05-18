const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	oid: {
		type: Number,
		required: true
	},
	food: {
		type: Array,
		required: true
	},
	quantity: {
		type: Array,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	buyer: {
		type: String,
		required: true
	},
	contact: {
		type: Number,
		required: true
	},
	address: {
		type: String,
		required: true
	}
}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);
module.exports = Order;