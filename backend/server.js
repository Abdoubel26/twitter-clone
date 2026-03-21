import express from 'express'
import connectDB from './config/db.js'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import followRouter from './routes/follow.route.js'
import notifsRouter from './routes/notifications.route.js'
import messageRouter from './routes/message.route.js'
import AIRouter from './routes/ai.route.js'
import { addMessage } from './controllers/message.controller.js'
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

    socket.on('send-message', (message) => {
        addMessage(message)
        socket.broadcast.emit('receive-message', (message))
    })



    socket.on('disconnect', () => {
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
app.use('/api/message', messageRouter)
app.use('/api/ai/', AIRouter)

connectDB()


server.listen('5000', () => {
    console.log('app listening in port 5000')
}) 