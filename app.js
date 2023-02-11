import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'
import userRouter from './router/signup.js'
import blogRouter from './router/blogs.js'

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter )
app.use('/api/users', userRouter)


export default app