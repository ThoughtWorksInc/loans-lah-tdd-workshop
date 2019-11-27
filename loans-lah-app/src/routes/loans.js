import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/', async (req, res) => {
  makeRequest(res, `${process.env.LOAN_SERVER}/api/v1/accounts/${req.user.sub}/loans`)
})

router.get('/:loanId', async (req, res) => {
  makeRequest(res, `${process.env.LOAN_SERVER}/api/v1/accounts/${req.user.sub}/loans/${req.params.loanId}`)
})

router.post('/', async (req, res) => {
  makeRequest(res, `${process.env.LOAN_SERVER}/api/v1/accounts/${req.user.sub}/loans`, {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' }
  })
})

const makeRequest = async (res, path, options) => {
  try {
    const response = await fetch(path, options)
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