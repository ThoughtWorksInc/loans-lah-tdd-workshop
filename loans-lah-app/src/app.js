import express from 'express'
import logger from 'morgan'

import usersRouter from './routes/users'
import loansRouter from './routes/loans'

import jwt from 'express-jwt'

import dbInit from './models'

const app = express()

dbInit()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  jwt({ secret: process.env.JWT_SECRET})
  .unless({ path: [
    { url: '/api/users', methods: ['POST'] },
    { url: '/api/users/login', methods: ['POST'] }
  ]})
)

app.use('/api/users', usersRouter)
app.use('/api/loans', loansRouter)

app.listen(3000, () => console.log(`Loan-lah app listening on port 3000!`))
