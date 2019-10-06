import supertest from 'supertest'
import express from 'express'
import users from '../users'
import Sequelize from 'sequelize'
import jwt from 'jsonwebtoken'

import expressJwt from 'express-jwt'
import User, { _init as userInit } from '../../models/user'

describe('request.agent(app)', () => {
  let sequelize
  let app
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:'
    })
    await sequelize.authenticate()
    userInit(sequelize)
    await User.sync()
    process.env.JWT_SECRET = 'secret'

    app = express()
    app.use(express.json())
    app.use(expressJwt({ secret: process.env.JWT_SECRET}).unless({path: [
      { url: '/users', methods: ['POST'] },
      { url: '/users/login', methods: ['POST'] }
    ]}))
    app.use('/users', users)
  })
  afterEach(async () => {
    await sequelize.close()
    delete(process.env.JWT_SECRET)
  })

  it('creates user', async () => {
    await supertest(app)
      .post('/users')
      .send({name: 'john', password: 'password1'})
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)

    const john = await User.findOne({where: {name: 'john'}})
    expect(john).toBeTruthy()
  });

  describe('get user', () => {
    let user
    beforeEach(async () => {
      user = await User.createUser("mary", "password1234")
    })
    it('gets the details for user', async () => {
      const token = jwt.sign(
        {},
        process.env.JWT_SECRET,
        {
          subject: user.id.toString()
        }
      )
      await supertest(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect(res => expect(res.body.id).toBe(user.id))
      .expect(res => expect(res.body.name).toBe(user.name))
      .expect(res => expect(res.body.password).toBeUndefined())
    })

    it('returns 401 for bad token', async () => {
      const badToken = jwt.sign(
        {
          sub: user.id
        },
        "wrong secret"
      )
      await supertest(app)
      .get('/users')
      .set('Authorization', `Bearer ${badToken}`)
      .set('Accept', 'application/json')
      .expect(401)
    })

    it('returns 401 for missing token', async () => {
      await supertest(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(401)
    })

    it('returns 404 for missing user', async () => {
      const token = jwt.sign(
        {
          sub: (user.id + 1)
        },
        process.env.JWT_SECRET
      )
      await supertest(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(404)
    })
  })

  describe('login', () => {
    let user
    beforeEach(async () => {
      user = await User.createUser("mary", "password1234")
    })

    it('responds 200 if login correct', async () => {
      await supertest(app)
      .post('/users/login')
      .send({name: user.name, password: 'password1234'})
      .set('Accept', 'application/json')
      .expect(200)
    })

    it('returns a valid jwt if login correct', async () => {
      await supertest(app)
      .post('/users/login')
      .send({name: user.name, password: 'password1234'})
      .set('Accept', 'application/json')
      .expect(res => {
        const valid_token = jwt.verify(res.body.jwt, process.env.JWT_SECRET)
        expect(valid_token).toBeTruthy()
      })
    })

    describe('jwt atribute verification', () => {
      it('returns a jwt containing the users id as subject if login correct', async () => {
        await supertest(app)
        .post('/users/login')
        .send({name: user.name, password: 'password1234'})
        .set('Accept', 'application/json')
        .expect(res => expect(jwt.decode(res.body.jwt).sub).toBe(user.id.toString()))
      })
    })

    it('responds 401 if user not found', async () => {
      await supertest(app)
      .post('/users/login')
      .send({name: 'bob', password: 'password1234'})
      .set('Accept', 'application/json')
      .expect(401)
    })

    it('responds 401 if user found but password wrong', async () => {
      await supertest(app)
      .post('/users/login')
      .send({name: user.name, password: 'had-a-little-lamb'})
      .set('Accept', 'application/json')
      .expect(401)
    })
  })
})