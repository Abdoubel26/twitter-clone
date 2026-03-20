import mongoose from "mongoose"


const notificationSchema = new mongoose.Schema({
    type: {type: String, enum : ["follow", "like"], required: true},
    from: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    to: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: false},
    seen: {type: Boolean, default: false},
    CreatedAt: {type: Date, default: Date.now()}
})


export default mongoose.model("Notification", notificationSchema)