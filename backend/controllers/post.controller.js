import Post from "../Models/postModel.js"
import dotenv from "dotenv"
import {createNotification} from "./notification.controller.js"



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

export const toggleLike = async (req, res) => {
    const { id } = req.id
    const { postId } = req.body
    if(!postId) return res.status(400).json({ success: false, message: "Post Id not Provided" })
    try {
        const post = await Post.findById(postId)
        if(!post.likes.some(like => like.toString() === id)){
            post.likes.push(id)
            await post.save()
            if(id !== post.poster._id){
                await createNotification(id, post.poster._id, "like", postId)
            }
            return res.status(200).json({ success: true, added: true})
        } else {
            post.likes = post.likes.filter(like => like.toString() !== id)
            await post.save()
            return res.status(200).json({ success: true, added: false})
        }
    }  catch(e) {
        return res.status(500).json({ success: false, message: `Server Error: ${e.message}` })
    }    
}

export const searchForPosts = async (req, res) => {
    const { text } = req.body
    if(!text) return res.status(400).json({ success: false, message: 'Missing required fields'})
    try {
        const posts = await Post.find({ $text: { $search: text} }, { score: { $meta: 'textScore'}}).sort({ score: { $meta: 'textScore'}}).populate('poster')
        return res.status(200).json({ success: true, message: "Posts searched", posts: posts})
    } catch(e) {
        return res.status(500).json({ success: false, message: `Server Error: ${e.message}`})
    }
}