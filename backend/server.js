import express from 'express'
import connectDB from './config/db.js'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import followRouter from './routes/follow.route.js'
import notifsRouter from './routes/notifications.route.js'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
))

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/follow', followRouter)
app.use('/api/notification', notifsRouter)

connectDB()

app.listen('5000', () => {
    console.log('app listening in port 5000')
}) 