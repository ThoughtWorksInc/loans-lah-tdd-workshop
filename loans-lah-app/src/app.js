import express from 'express'
import logger from 'morgan'

import indexRouter from './routes/index'
import userRouter from './routes/users'

import jwt from 'express-jwt'

export default app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(jwt({ secret: process.env.JWT_SECRET}).unless({path: ['/users'], method: "POST"}))

app.use('/', indexRouter)
app.use('/users', userRouter)
