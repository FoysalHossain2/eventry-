import mongoose from "mongoose";

export async function dbConnect() {
 try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('connect');
    
    return conn
 } catch (error) {
    console.log(error);
    
 }   
}