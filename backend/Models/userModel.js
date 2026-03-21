import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    bio: {type: String, required: true},
    imageUrl: {type: String},
    bannerImageUrl: {type: String},
    password: {type: String, required: true}
})

userSchema.index({name: 'text', bio: 'text'})

export default mongoose.model("User", userSchema)