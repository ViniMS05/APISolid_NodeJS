import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-service'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body) // .parse() throw an error if validation fails

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }

  return res.status(200).send()
}
