import express from 'express'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import {promisify} from 'util'

const router = express.Router()
const signJwt = promisify(jwt.sign)

router.post('/', async (req, res, next) => {
  await User.createUser(req.body.name, req.body.password)
  res.json()
})

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({where: {name: req.body.name}})
  if (!user) return res.status(401).send()
  
  const passwordValid = await user.verifyPassword(req.body.password)
  if (!passwordValid) return res.status(401).send()
  
  const token = await signJwt(
    {
      name: user.name,
      sub: user.id
    },
    process.env.JWT_SECRET
  )
  res.json({jwt: token})
})

module.exports = router;
