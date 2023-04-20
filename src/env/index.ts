import 'dotenv/config'
import { z } from 'zod'

// Validate environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env) // Safeparse tries to validate the process.env by checking if it has the same information passed

if (_env.success === false) {
  // if _env throw error
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.') // Stop if has error
}

export const env = _env.data
