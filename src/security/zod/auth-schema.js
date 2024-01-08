import { z } from 'zod'

// Validation schema for register
export const resgisterSchema = z.object({
  email: z.string().email('The email is not valid'),
  password: z.string().min(8, 'Password must be more than 8 characters'),
  username: z
    .string()
    .regex(/^[0-9a-zA-Z_]+$/, 'Username must only contain numbers and letters')
    .max(25, 'Username must be less than 25 characters'),
})

// Validation schema for login
export const loginSchema = z.object({
  email: z.optional(z.string().email('The email is not valid')),
  password: z.optional(z.string()),
  code: z.optional(z.string()),
})

// Validation schema for forgot Password
export const forgotPasswordSchema = z.object({
  email: z.string().email('The email is not valid'),
})

// Validation schema for Reset password
export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be more than 8 characters'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export const settingsSchema = z.object({
  username: z.string().min(3).max(20),
  name: z.string().max(100).nullable(),
  bio: z.string().max(70).nullable(),
  siteLink: z.string().url().nullable(),
})
