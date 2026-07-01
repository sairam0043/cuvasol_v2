import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cuvasol';
    
    // Configure Mongoose to fail fast if no database is running
    mongoose.set('bufferCommands', false);
    
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000, // Fail after 2s instead of waiting indefinitely
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.warn(`\n[Database Warning] Could not connect to MongoDB: ${error.message || error}`);
    console.warn(`[Database Warning] Running server in MOCK IN-MEMORY fallback mode. All features will work using server memory.\n`);
  }
};
