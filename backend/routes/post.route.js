import { createPost, deletePost, getPosts, toggleLike} from "../controllers/post.controller.js"
import e from 'express'
import authMiddleware from "../middleware/auth.js"

const router = e.Router()

router.get('/', getPosts)

router.post('/create', authMiddleware , createPost)

router.put('/like', authMiddleware, toggleLike)

router.delete('/delete', authMiddleware , deletePost)

export default router
