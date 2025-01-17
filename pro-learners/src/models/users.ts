import exp from 'constants';
import mongoose, { Schema, Document } from 'mongoose';

const userSchema = new Schema(
	{
		name: String,
		email: String,
		photoURL: String,
	},
	{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
