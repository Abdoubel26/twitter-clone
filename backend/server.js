import express from 'express'

const app = express()

app.use(express.json())



app.listen('5000', () => {
    console.log('app listening in port 5000')
})