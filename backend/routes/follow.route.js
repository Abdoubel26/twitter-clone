import e from "express"
import { follow, unfollow, getFollows } from "../controllers/follow.controller.js"
import authMiddleware from '../middleware/auth.js'

const router = e.Router()

router.get('/get', getFollows)

router.post('/post', authMiddleware, follow)

router.delete('/unfollow', authMiddleware, unfollow)

export default router