import mongoose from "mongoose";
import dotevn from "dotenv"

dotevn.config()

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("Database Connected:" + conn.connection.host )
}

export default connectDB