import e from 'express'
import { getMessages, seeMessages, getUnseenMessages } from '../controllers/message.controller.js'
import authMiddleware from '../middleware/auth.js'

const router = e.Router()

router.get('/get', getMessages)

router.get('/unseen', authMiddleware, getUnseenMessages)

router.put('/see', authMiddleware, seeMessages )

export default router