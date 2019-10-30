import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await fetch(`${process.env.LOAN_SERVER}/api/v1/accounts/${req.user.sub}/loans`)
    if (response.ok) {
      const body = await response.json()
      res.json(body)
    } else {
      res.status(response.status).send()
    }
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

module.exports = router;