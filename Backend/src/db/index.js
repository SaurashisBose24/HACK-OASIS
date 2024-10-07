import mongoose from "mongoose";


const connectDB = async () => {
    try{
        const connIn = await mongoose.connect('mongodb://localhost:27017/HealthCheck');
        console.log("Mongo DB connected");
    }
    catch(err){
        console.log("MONGO DB connection failed");
        process.exit(1);
    }
}

export default connectDB