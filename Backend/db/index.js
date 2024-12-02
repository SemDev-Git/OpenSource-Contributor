import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";
import dotenv from 'dotenv'

dotenv.config({ path: './.env' });

const connectDB = async ()=>{
    try {
        const connectionInstance= await mongoose.connect("mongodb+srv://suhaibhussain1906:mongodb@cluster0.wcw7y.mongodb.net/Backend")
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)
    }
}
export default connectDB