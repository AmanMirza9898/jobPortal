import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("CRITICAL ERROR: MONGO_URI is not defined in environment variables!");
            return;
        }
        
        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error("MongoDB connection failed:", err.message);
        // We log the detailed error here
        if (err.message.includes("buffering timed out")) {
            console.error("TIP: This usually means the IP is not whitelisted or the URI is incorrect.");
        }
    }
}

export default connectDB;