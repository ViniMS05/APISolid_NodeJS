import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase // System Under Test

describe('Validate Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)
  })


  it('it should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
        gym_id: 'gym_01',
        user_id: 'user-01'
    })

    const {checkIn} = await sut.execute({
        checkInId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('it should not be able to validate an inexisting check-in', async () => {
    await expect(() => 
     sut.execute({
        checkInId: 'inexisting'
    })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
