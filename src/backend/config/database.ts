import mongoose from "mongoose";

const connectDB = async () : Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("Your mongoDB connectiooon was estab.");
    } catch (error) {
        console.log("Error connecting to mongoDB:", error );
        process.exit(1);
    }
}

export default connectDB;