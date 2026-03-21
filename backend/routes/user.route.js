import { signup, login, updateUser, getUser, getAllUsers, searchUsers } from "../controllers/user.controller.js";
import e from "express";
import authMiddleware from "../middleware/auth.js";

const router = e.Router()

router.get('/all', getAllUsers)

router.get('/me', authMiddleware,  getUser)

router.post('/signup', signup)
 
router.post('/login', login)

router.post('/search', searchUsers)

router.put('/update',authMiddleware, updateUser)

export default router