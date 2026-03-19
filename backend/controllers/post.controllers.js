import Post from "../Models/postModel.js"
import dotenv from "dotenv"


dotenv.config()


export const createPost = async (req, res) => {
    const { id } = req.id
    const { text, imageUrl, poster} = req.body
    if(id !== poster._id) return res.status(400).json({ success: false, message: "Poster authentication problem"})
    try {
        const newPost = await Post.create({text, imageUrl, poster})
        return res.status(201).json({ success: true, message: "Post Created Successfully"})
    } catch(e) {
        return res.status(500).json({ success: false, message: `Server Error: ${e.message}`})
    }
}


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("poster")
        const safePosts = posts.map((post) => {
            const poster = post.poster.toObject()
            const { password, ...safePoster } = poster
            post.poster = safePoster
            return post
        })
        return res.status(200).json({ success: true, message: "posts fetched from database", posts: safePosts })
    }
    catch(e) {
        console.log(e)
        return res.status(500).json({ success: false, message: `Server Error: ${e.message}` })
    }
}

export const deletePost  = async (req, res) => {
    const { id } = req.id
    const { postId } = req.query
    if(!postId) return res.status(400).json( {success: false, message: 'Post id not provided'})
    try {
        const deletedPost = await Post.findByIdAndDelete(postId)
        if(!deletePost) return res.status(404).json({ success: false, message: "Post not Found!"})
        else return res.status(200).json({ success: true, message: "Post deleted successfully", post: deletePost})
    }
    catch(e) {
        return res.status(500).json({ success: false, message: `Server Error: ${e.message}` })
    }
}

