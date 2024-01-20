import z from 'zod'
import { UserInterface } from '../types'

const UserSchema = z.object({
  email: z
    .string({ required_error: 'email address is required' })
    .email({ message: 'must be a valid email address' }),
  password: z
    .string({ required_error: 'password is required' })
    .min(8, { message: 'password must be at least 8 characters long' })
})

export function validateUser(object: UserInterface) {
  return UserSchema.safeParse(object)
}
