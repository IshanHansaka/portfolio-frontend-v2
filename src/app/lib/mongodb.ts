import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};

export default connectMongoDB;
