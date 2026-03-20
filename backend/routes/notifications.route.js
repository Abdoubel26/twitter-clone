import { getNotifs, seeNotifs, countUnseenNotifs } from "../controllers/notification.controller.js";
import authMiddleware from '../middleware/auth.js'
import express from "express"

const router = express.Router()

router.get('/get', authMiddleware, getNotifs)

router.get('/count', authMiddleware, countUnseenNotifs)

router.put('/see', authMiddleware, seeNotifs)

 
export default router