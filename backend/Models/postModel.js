import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    text: { type: String, required: true },
    imageUrl: { type: String, required: true},
    poster: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    likeCount: {type: Number, default: 0}
})


export default mongoose.model("Post", postSchema)