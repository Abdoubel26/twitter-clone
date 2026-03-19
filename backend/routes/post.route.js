import { createPost, deletePost, getPosts} from "../controllers/post.controllers.js"
import e from 'express'
import authMiddleware from "../middleware/auth.js"

const router = e.Router()

router.get('/', getPosts)

router.post('/create', authMiddleware , createPost)

router.delete('/delete', authMiddleware , deletePost)

export default router
