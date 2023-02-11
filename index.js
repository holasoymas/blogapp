import * as dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import app from './app.js'
import mongoose from 'mongoose'

const url = process.env.MONGO_URL
mongoose.set('strictQuery', true)
mongoose.connect(url)

const httpSercer = http.createServer(app)

const PORT = process.env.PORT

httpSercer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
