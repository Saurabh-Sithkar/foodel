import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sithkar03:ranu@cluster0.x6hphl2.mongodb.net/foodel').then(()=>console.log("DB connected"));



}