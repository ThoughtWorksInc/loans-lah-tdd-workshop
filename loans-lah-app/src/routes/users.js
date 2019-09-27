import express from 'express'
import User from '../models/user'

var router = express.Router()

router.post('/', async (req, res, next) => {
  await User.createUser(req.body.name, req.body.password)
  res.json()
})

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({where: {name: req.body.name}})
  if (!user) return res.status(401).send()
  const passwordValid = await user.verifyPassword(req.body.password)
  if (!passwordValid) return res.status(401).send()
  res.json()
})

module.exports = router;
