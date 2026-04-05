import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error("MongoDB connection failed:", err.message);
        // Removed process.exit(1) to avoid server crash on Render
    }
}

export default connectDB