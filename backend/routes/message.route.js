import e from 'express'
import { getMessages } from '../controllers/message.controller.js'

const router = e.Router()

router.get('/get', getMessages)

export default router