import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	roles: {
		User: {
			type: Number,
			default: 2001,
		},
		Editor: Number,
		Admin: Number,
	},
	refreshToken: String,
});

export default mongoose.model('User', UserSchema);
