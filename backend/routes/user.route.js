import { signup, login, updateUser, getUser, getAllUsers } from "../controllers/user.controllers.js";
import e from "express";
import authMiddleware from "../middleware/auth.js";

const router = e.Router()

router.get('/all', getAllUsers)

router.get('/me', authMiddleware,  getUser)

router.post('/signup', signup)

router.post('/login', login)

router.put('/update',authMiddleware, updateUser)

export default router