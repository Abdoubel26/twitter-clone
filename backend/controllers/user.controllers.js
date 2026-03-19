import User from "../Models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import dotenv from "dotenv"


dotenv.config()

export const signup = async (req, res) => {
    const { name, bio, password, email } = req.body
    if(!name || !password || !email) { return res.status(400).json({ success: false, message: "Missing required fields"}) }

    try {
        const foundUser = await User.findOne({email: email})
        if(foundUser) return res.status(200).json({ success: false, message: "Email already registered"})
        const hashedPassword = await bcrypt.hash(password, 10)
        const createdUser = new User({ name, bio, email, password: hashedPassword})
        const user = await createdUser.save()
        const { password: _, ...safeUser } =  user.toObject()
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET, { expiresIn: "2d"})
        return res.status(201).json( { success: true, message: "Signed up successfully", user: safeUser, token: token} )
    }
    catch (e) {
        console.log(e.message)
        return res.status(500).json({ success: false, message: `Server Error ${e.message}`} )
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.status(400).json({ success: false, message: "Missing required fields" })

    try {
        const foundUser = await User.findOne({email: email})

        if(!foundUser) return res.status(400).json({ success: false, message: "Email not registered"})
        
        const isMatch = bcrypt.compare(password, foundUser.toObject().password)

        if(!isMatch) return res.status(400).json({ success: false, message: "Wrong credentials"})
        else {
        const { password: _, ...safeUser } = foundUser.toObject()
        const token = jwt.sign({id: foundUser._id}, process.env.JWT_SECRET, {expiresIn: "2d"})
        return res.status(200).json({ success: true, message: 'Logged in successfully', token: token, user: safeUser })
    } 
    } catch(e) {
        console.log(e.message)
        return res.status(500).json( { success: false, message: `Server Error ${e.message}`, })
    }
}


export const updateUser = async (req, res) => {
    const { id } = req.id
    const { bio, name, imageUrl, bannerImageUrl } = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {bio, name, imageUrl, bannerImageUrl})
        const { password, ...safeUser} = updatedUser.toObject()
        return res.status(200).json({ success: true, user: safeUser})
    } catch(e) {
        return res.status(500).json({ success: false, message: ` Server Error ${e.message}`})
    }
}


export const getUser = async (req, res) => {
    const { id } = req.id 
    try {
        const thisUser = await User.findById(id)
        if(!thisUser) return res.status(404).json({ success: false, message: "User not found at getUser"})
        const { password, ...safeUser} = thisUser.toObject()
        return res.status(200).json({ success: true, message: "User Found", user: safeUser})
    } catch(e) {
        console.log(e.message)
        return res.status(500).json({ success: false, message: `Server Error: ${e.message}`})
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        const safeUsers = users.map((user) => {
             const {password, ...safeUser } = user.toObject() 
             return safeUser
            } )
        return res.status(200).json({ success: true, message: "Users Found", users: safeUsers})
    } catch(e) {
        console.log(e.message)
        return res.status(500).json({ success: false, message: `Server Error: ${e.message}`})
    }
}