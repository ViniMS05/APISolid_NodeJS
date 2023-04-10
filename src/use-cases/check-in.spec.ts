import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase // System Under Test

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('it should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymdkwaok',
      userId: 'jodiejoae'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
