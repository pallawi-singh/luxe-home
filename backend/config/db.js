import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pallawikumari:pallawi1619@cluster0.xr7xm.mongodb.net/luxehome').then(() => console.log("DB connected"));
}