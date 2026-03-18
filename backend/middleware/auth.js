import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization) return res.status(401).json({ success: false, detail: "authorization not Provided"})

    const token = authorization.split(" ")[1]

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        req.id = { id }
        next()
    } catch(e) {
        console.log(e.message)
        return res.status(500).json({ success: false, detail: `Server Error (in authMiddleware): ${e.message}`})
    }
}

export default authMiddleware