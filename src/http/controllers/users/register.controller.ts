import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/users-already-exists'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-service'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    // Validating the User Object
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body) // .parse() throw an error if validation fails

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }

    throw err
  }

  return res.status(201).send() // Return a 201 "created" status
}
