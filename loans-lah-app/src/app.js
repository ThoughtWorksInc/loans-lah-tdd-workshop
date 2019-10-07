import express from 'express'
import logger from 'morgan'

import indexRouter from './routes/index'
import userRouter from './routes/users'

import jwt from 'express-jwt'

const app = express()

export default app

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
