import express from 'express'
import User from '../models/user'

var router = express.Router()

router.post('/', async (req, res, next) => {
  await User.createUser(req.body.name, req.body.password)
  res.json()
})

module.exports = router;
