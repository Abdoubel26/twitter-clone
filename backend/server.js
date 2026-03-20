import express from 'express'
import connectDB from './config/db.js'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import followRouter from './routes/follow.route.js'
import notifsRouter from './routes/notifications.route.js'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

const app = express()

app.use(express.json())

const server = http.createServer(app)

const io = new Server(server, { cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}})

io.on('connection', (socket) => {
    console.log("connected:" + socket.id)

    socket.on('disconnection', () => {
        console.log("disconnected:" + socket.id)
    })
})

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


server.listen('5000', () => {
    console.log('app listening in port 5000')
}) 