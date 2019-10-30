import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/', async (req, res) => {
  makeRequest(res, req.user.sub)
})

router.post('/', async (req, res) => {
  makeRequest(res, req.user.sub, { method: 'POST', body: JSON.stringify(req.body) })
})

const makeRequest = async (res, userId, options) => {
  try {
    const response = await fetch(`${process.env.LOAN_SERVER}/api/v1/accounts/${userId}/loans`, options)
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
}

module.exports = router;