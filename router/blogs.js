import express from 'express'
const router = express.Router()
import Blog from '../models/blog.js'
import User from '../models/user.js'

router.get('/', async (req, res) => {
    try {
      const getUser = await Blog.find()
      res.json(getUser)
    } catch (err) {
      console.log(err)
    }
  })

router.post('/', async (req, res) => {
    console.log(req.body)
    const { title, blog, author } = req.body
    const user = await User.findById({ _id: author })
    console.log("Get user data is ", user)
    const newBlog = new Blog({ title, blog, author: user._id })
    try {
      const saveBlog = await newBlog.save()
      user.blog = user.blog.concat(saveBlog._id)
      await user.save()
      res.json(saveBlog)
    } catch (err) {
      console.log(`Error is : ${err}`)
    }
  })

export default router