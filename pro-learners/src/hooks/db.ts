import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

const connectDb = async () => {
	if (mongoose.connections[0].readyState) {
		console.log('Already connected to MongoDB');
		return;
	}
	if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
		console.log('Please add your Mongo URI to .env.local');
		process.exit(1);
	}
	try {
		await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error(error);
	}
};

export default connectDb;
