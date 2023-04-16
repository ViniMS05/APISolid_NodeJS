import { Gym, Prisma } from '@prisma/client'

export interface FindManyNeabyParams {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  SearchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNeabyParams): Promise<Gym[]>
}
