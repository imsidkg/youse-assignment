import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI!;
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to mongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
