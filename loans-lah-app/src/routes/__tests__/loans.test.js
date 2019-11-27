import supertest from 'supertest'
import express from 'express'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import loans from '../loans'

import nock from 'nock'

describe('loans api', () => {
  let token
  let app

  beforeAll(() => {
    process.env.JWT_SECRET = 'secret'
    process.env.LOAN_SERVER = 'http://loans.lah'

    app = express()
    app.use(express.json())
    app.use(expressJwt({ secret: process.env.JWT_SECRET }))
    app.use('/loans', loans)

    token = jwt.sign(
      {},
      process.env.JWT_SECRET,
      {
        subject: "1"
      }
    )
  })
  afterAll(() => {
    delete (process.env.JWT_SECRET)
    delete (process.env.LOAN_SERVER)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('/loans list', () => {
    it('lists loans', async () => {
      const expectedResponse = [
        { id: 1, amount: 200 },
        { id: 2, amount: 500 }
      ]
      nock(process.env.LOAN_SERVER)
        .get('/api/v1/accounts/1/loans')
        .reply(200, expectedResponse)

      await supertest(app)
        .get('/loans')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => expect(res.body).toEqual(expectedResponse))
    })
    it('passes the error down', async () => {
      nock(process.env.LOAN_SERVER)
        .get('/api/v1/accounts/1/loans')
        .reply(418)

      await supertest(app)
        .get('/loans')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(418)
    })
    it('gives 401 if missing the token', async () => {
      await supertest(app)
        .get('/loans')
        .set('Accept', 'application/json')
        .expect(401)
    })
    it('gives 500 for unexpected errors', async () => {
      nock(process.env.LOAN_SERVER)
        .get('/api/v1/accounts/1/loans')
        .reply(200)//no body!

      await supertest(app)
        .get('/loans')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(500)
    })
  })
  describe('/loans post', () => {
    const loan = { amount: 1000000, durationInDays: 100 }

    it('lists loans', async () => {
      const expectedResponse = { status: "looks legit", location: "over there" }

      nock(process.env.LOAN_SERVER)
        .post('/api/v1/accounts/1/loans', loan)
        .reply(200, expectedResponse)

      await supertest(app)
        .post('/loans')
        .send(loan)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(res => expect(res.body).toEqual(expectedResponse))
    })
    it('gives 401 if missing the token', async () => {
      await supertest(app)
        .post('/loans')
        .send(loan)
        .set('Accept', 'application/json')
        .expect(401)
    })
    it('passes the error down', async () => {
      nock(process.env.LOAN_SERVER)
        .post('/api/v1/accounts/1/loans', loan)
        .reply(418)

      await supertest(app)
        .post('/loans')
        .send(loan)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(418)
    })
    it('gives 500 for unexpected errors', async () => {
      nock(process.env.LOAN_SERVER)
        .post('/api/v1/accounts/1/loans', loan)
        .reply(200)//no body!

      await supertest(app)
        .post('/loans')
        .send(loan)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(500)
    })
  })
  describe('/loans/{id} details', () => {
    it('gets loan details', async () => {
      const expectedResponse = { id: 1, amount: 200 }
      nock(process.env.LOAN_SERVER)
        .get('/api/v1/accounts/1/loans/1')
        .reply(200, expectedResponse)

      await supertest(app)
        .get('/loans/1')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => expect(res.body).toEqual(expectedResponse))
    })
    it('passes the error down', async () => {
      nock(process.env.LOAN_SERVER)
        .get('/api/v1/accounts/1/loans/1')
        .reply(418)

      await supertest(app)
        .get('/loans/1')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(418)
    })
    it('gives 401 if missing the token', async () => {
      await supertest(app)
        .get('/loans/1')
        .set('Accept', 'application/json')
        .expect(401)
    })
    it('gives 500 for unexpected errors', async () => {
      nock(process.env.LOAN_SERVER)
        .get('/api/v1/accounts/1/loans/1')
        .reply(200)//no body!

      await supertest(app)
        .get('/loans/1')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(500)
    })
  })
})
