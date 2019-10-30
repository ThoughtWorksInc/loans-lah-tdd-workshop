import supertest from 'supertest'
import express from 'express'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import loans from '../loans'

import nock from 'nock'

describe('loans api', () => {
  let app
  beforeAll(() => {
    process.env.JWT_SECRET = 'secret'
    process.env.LOAN_SERVER = 'http://loans.lah'

    app = express()
    app.use(express.json())
    app.use(expressJwt({ secret: process.env.JWT_SECRET}))
    app.use('/loans', loans)
  })
  afterAll(() => {
    delete(process.env.JWT_SECRET)
    delete(process.env.LOAN_SERVER)
  })

  describe('/loans list', () => {
    it('lists loans', async () => {
      const expectedResponse = [
        {id: 1, amount: 200},
        {id: 2, amount: 500}
      ]
      nock(process.env.LOAN_SERVER)
      .get('/api/v1/accounts/1/loans')
      .reply(200, expectedResponse)

      const token = jwt.sign(
        {},
        process.env.JWT_SECRET,
        {
          subject: "1"
        }
      )
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

      const token = jwt.sign(
        {},
        process.env.JWT_SECRET,
        {
          subject: "1"
        }
      )
      await supertest(app)
        .get('/loans')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(418)
    })
    it('gives 500 for unexpected errors', async () => {
      nock(process.env.LOAN_SERVER)
      .get('/api/v1/accounts/1/loans')
      .reply(200)//no body!

      const token = jwt.sign(
        {},
        process.env.JWT_SECRET,
        {
          subject: "1"
        }
      )
      await supertest(app)
        .get('/loans')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(500)
    })
  })
})
