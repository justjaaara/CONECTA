import { z } from 'zod'

export const SignUpSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .max(100, { message: 'Email must be less than 100 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(100, { message: 'Password must be less than 100 characters' }),
})