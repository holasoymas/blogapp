import express from 'express'
const router = express.Router()
import User from '../models/user.js'

router.get('/', async (req, res) => {
    try {
      const getUser = await User.find()
      res.json(getUser)
    } catch (err) {
      console.log(err)
    }
  })

router.post('/', async (req, res) => {
    const { fname, lname, username, dob, password, gender } = req.body
    const user = new User({
      fname,
      lname,
      username,
      dob,
      password,
      gender
    })
  
    try {
      const userSave = await user.save()
      res.status(201).send(userSave)
    } catch (err) {
      console.log(err)
    }
  })
  
export default router