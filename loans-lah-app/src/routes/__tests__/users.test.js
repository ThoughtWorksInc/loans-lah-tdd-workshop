import supertest from 'supertest'
import express from 'express'
import users from '../users'
import Sequelize from 'sequelize'
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
  })
  afterEach(async () => {
    await sequelize.close()
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
    beforeEach(async () => {
      await User.createUser("mary", "password1234")
    })

    it('responds 200 if login correct', async () => {
      await supertest(app)
      .post('/users/login')
      .send({name: 'mary', password: 'password1234'})
      .set('Accept', 'application/json')
      .expect(200)
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
      .send({name: 'mary', password: 'had-a-little-lamb'})
      .set('Accept', 'application/json')
      .expect(401)
    })
  })
})