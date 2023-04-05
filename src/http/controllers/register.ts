import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterService } from '@/services/registerNewUser'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    // Validating the User Object
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body) // .parse() throw an error if validation fails

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(usersRepository)

    await registerService.execute({ name, email, password })
  } catch (err) {
    return res.status(409).send()
  }

  return res.status(201).send() // Return a 201 "created" status
}
