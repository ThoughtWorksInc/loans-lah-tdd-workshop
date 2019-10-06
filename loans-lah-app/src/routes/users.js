import express from 'express'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import {promisify} from 'util'

const router = express.Router()
const signJwt = promisify(jwt.sign)

router.post('/', async (req, res) => {
  await User.createUser(req.body.name, req.body.password)
  res.json()
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({where: {name: req.body.name}})
  if (!user) return res.status(401).send()
  
  const passwordValid = await user.verifyPassword(req.body.password)
  if (!passwordValid) return res.status(401).send()
  
  const token = await signJwt(
    {},
    process.env.JWT_SECRET,
    {
      subject: user.id.toString()
    }
  )
  res.json({jwt: token})
})

router.get('/', async (req, res) => {
  const user = await User.findByPk(req.user.sub)
  if (!user) {
    return res.status(404).send()
  }
  res.json({id: user.id, name: user.name})
})

module.exports = router;
