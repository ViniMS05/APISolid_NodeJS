import { UsersRepository } from '@/repositories/prisma/users-repositorie'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/users-already-exists'
import type { User } from '@prisma/client'

interface ResgisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: ResgisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6) // 6 it's the count of hashing rounds

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      // If a user with the same email already exists, return an error
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
