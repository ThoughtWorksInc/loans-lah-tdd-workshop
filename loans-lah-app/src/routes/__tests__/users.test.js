import supertest from 'supertest'
import express from 'express'
import users from '../users'
import Sequelize from 'sequelize'
import jwt from 'jsonwebtoken'
import User, { _init as userInit } from '../../models/user'

describe('request.agent(app)', () => {
  let sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:'
    })
    await sequelize.authenticate()
    userInit(sequelize)
    await User.sync()
    process.env.JWT_SECRET = 'secret'
  })
  afterEach(async () => {
    await sequelize.close()
    delete(process.env.JWT_SECRET)
  })

  const app = express()
  app.use(express.json())
  app.use('/users', users)

  it('responds with json', async () => {
    await supertest(app)
      .post('/users')
      .send({name: 'john', password: 'password1'})
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)

    const john = await User.findOne({where: {name: 'john'}})
    expect(john).toBeTruthy()
  });

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

    describe('jwt atribute verification', async () => {
      it('returns a jwt containing the username if login correct', async () => {
        await supertest(app)
        .post('/users/login')
        .send({name: user.name, password: 'password1234'})
        .set('Accept', 'application/json')
        .expect(res => expect(jwt.decode(res.body.jwt).name).toBe(user.name))
      })

      it('returns a jwt containing the users id as subject if login correct', async () => {
        await supertest(app)
        .post('/users/login')
        .send({name: user.name, password: 'password1234'})
        .set('Accept', 'application/json')
        .expect(res => expect(jwt.decode(res.body.jwt).sub).toBe(user.id))
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