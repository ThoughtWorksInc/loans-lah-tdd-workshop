import express from 'express'
import logger from 'morgan'

import indexRouter from './routes/index'
import userRouter from './routes/users'

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
    { url: '/users', methods: ['POST'] },
    { url: '/users/login', methods: ['POST'] }
  ]})
)

app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(3000, () => console.log(`Loan-lah app listening on port 3000!`))
