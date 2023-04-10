import { UsersRepository } from '@/repositories/prisma/users-repositorie'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    // Search for user in database for email
    // Compare if the password saved in the database matches the parameter password

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
