import { FastifyInstance } from 'fastify'
import { register } from '../controllers/register.controller'
import { authenticate } from '../controllers/athenticate.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register) // Register user route

  app.post('/sessions', authenticate) // Authenticate user route
}
