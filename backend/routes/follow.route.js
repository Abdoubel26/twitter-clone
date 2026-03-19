import e from "express"
import { follow, unfollow } from "../controllers/follow.controllers"
import authMiddleware from '../middleware/auth'


const router = e.Router()

router.post('/follow', authMiddleware, follow)

router.post('/unfollow', authMiddleware, unfollow)

export default router