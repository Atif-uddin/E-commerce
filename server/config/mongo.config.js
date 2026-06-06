import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const db = process.env.MONGO_URL

const dbConnect = async()=>{

    try {
        await mongoose.connect(db)
        console.log('DB connnected Successfully!✅');
    } catch (error) {
        console.log(error);
        console.log('Error connecting to DB❌');
    }
}
dbConnect()

export default dbConnect 