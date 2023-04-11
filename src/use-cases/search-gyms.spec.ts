import { expect, describe, it, beforeEach} from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'


let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase // System Under Test

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('it should be able to fetch gyms by title', async () => {
    await gymsRepository.create({
        title: 'Inova Gym',
        description: null,
        phone: null,
        latitude: -23.5482565,
        longitude: -46.813057,
    })

    await gymsRepository.create({
        title: 'Smart Fit Gym',
        description: null,
        phone: null,
        latitude: -23.5482565,
        longitude: -46.813057,

    })
    
    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 1
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
        expect.objectContaining({title: 'Inova Gym'}),
        expect.objectContaining({title: 'Smart Fit Gym'}),
    ])
  })

  it('it should be able to fetch paginated gyms by title', async () => {
    for(let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5482565,
        longitude: -46.813057,
    })
    }
    
    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
        expect.objectContaining({title: 'Gym 21'}),
        expect.objectContaining({title: 'Gym 22'}),
    ])
  })
})
