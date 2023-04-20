import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Jonh Doe',
    email: 'jonhdoe@example.com',
    password: 'test123',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jonhdoe@example.com',
    password: 'test123',
  })

  const { token } = authResponse.body

  return { token }
}
