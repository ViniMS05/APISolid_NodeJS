import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase // System Under Test

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.create({
      id: 'gym-one',
      title: 'Nova',
      description: '',
      phone: '',
      latitude: -27,
      longitude: -30,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('it should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-one',
      userId: 'user-one',
      userLatitude: -27,
      userLongitude: -30,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('it should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-one',
      userId: 'user-one',
      userLatitude: -27,
      userLongitude: -30,
    })

    await expect(
      sut.execute({
        gymId: 'gym-one',
        userId: 'user-one',
        userLatitude: -27,
        userLongitude: -30,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('it should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-one',
      userId: 'user-one',
      userLatitude: -27,
      userLongitude: -30,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-one',
      userId: 'user-one',
      userLatitude: -27,
      userLongitude: -30,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('it should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-two',
      title: 'Nova',
      description: '',
      phone: '',
      latitude: new Decimal(-23.5482565),
      longitude: new Decimal(-46.813057),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-two',
        userId: 'user-one',
        userLatitude: -23.5486893,
        userLongitude: -46.8320256,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
