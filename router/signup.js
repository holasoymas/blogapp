import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import express from 'express'
const router = express.Router()
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const getToken = req => {
  const auth = req.get('Authorization')
  if (auth && auth.startsWith(`bearer `)) {
    // console.log("Auth is", auth.replace('bearer ', ''))
    return auth.replace('bearer ', '')
  }
  return null
}

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     const glbUserToken = decodedToken
//     // req.user = decodedToken;
//     console.log(glbUserToken)
//     next();
//   });
// };

router.get('/backend', async (req, res) => {
  try {
    const user = await User.find().populate('blog')
    res.status(200).send(user)
  } catch (err) {
    console.log(err)
  }
})

router.get('/', async (req, res) => {

  const token = getToken(req)

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  // console.log('Decoded token is ', decodedToken)
  try {
    const getUser = await User.find().populate('blog')
    const getGlobalUser = await User.findById(decodedToken.id)
    if (!getGlobalUser) {
      res.status(400).json({ err: "Log in" })
    }
    // console.log(getGlobalUser)
    res.json({ getUser, getGlobalUser })
  } catch (err) {
    console.log(err)
  }
})

router.post('', async (req, res) => {
  const { fname, lname, username, dob, password, email, gender } = req.body
  const user = new User({
    fname,
    lname,
    email,
    username,
    dob,
    password,
    gender
  })

  try {
    const userSave = await user.save()
    const jwtData = {
      id: userSave._id,
      username: userSave.username
    }
    const token = jwt.sign(jwtData, process.env.SECRET_KEY)
    // console.log(token)
    res.status(201).json({ token, username: userSave.username, id: userSave._id })
  } catch (err) {
    console.log(err)
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const findUser = await User.findOne({ email })
    if (findUser.password !== password) {
      return res.status(401).send("Invalid credentials")
    }
    const userToken = {
      username: findUser.username,
      id: findUser._id
    }
    const token = jwt.sign(userToken, process.env.SECRET_KEY)
    // console.log('Token is', token)
    res.status(200).send({ token, username: findUser.username, id: findUser._id })
    console.log("User is ", findUser)
  } catch (err) {
    console.log(err)
  }
})

router.get('/:profile', async (req, res) => {
  // console.log(req)
  const token = getToken(req)
  const username = req.params.profile

  if (!token) {
    res.status(401).json({ err: "unauthorized user" })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

  // console.log(username)
  // console.log(typeof username)
  try {
    const newUser = await User.findOne({ username }).populate('blog')
    const glbUserToken = await User.findById(decodedToken.id)

    // console.log(newUser)
    res.status(200).json({ newUser, glbUserToken })
    // res.status(200).json(newUser)
  } catch (err) {
    console.log(err)
  }
})

export default router
