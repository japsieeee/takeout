const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const staffSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Please enter a username'],
		minlength: [4, 'Minimum username length is 4 characters'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [6, 'Minimum password length is 6 characters']
	}
}, { timestamps: true });

staffSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
})

staffSchema.statics.login = async function(username, password) {
	const staff = await this.findOne({ username })
	if (staff) {
		const auth = await bcrypt.compare(password, staff.password);
		if (auth) {
			return staff;
		} else {
			throw new Error("Incorrect username or password");	
		}
	} else {
		throw new Error("Username doesn't exist");
	}
}

const Staff = mongoose.model('staff', staffSchema);

module.exports = Staff;