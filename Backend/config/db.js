import mongoose  from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.Mongodb_URL);
        console.log("db Connected");
    }
    catch(error) {
        console.log(error);
    }
}

export default connectDB