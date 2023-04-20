import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(req.query)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  })

  return res.status(200).send({
    checkIns,
  })
}
