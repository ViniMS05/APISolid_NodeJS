import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface ResgisterServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: ResgisterServiceRequest) {
    const password_hash = await hash(password, 6) // 6 it's the count of hashing rounds

    const userWithSameEmail = await prisma.user.findUnique({
      // Search for users with the same email
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      // If a user with the same email already exists, return an error
      throw new Error('E-mail already exist')
    }

    this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
