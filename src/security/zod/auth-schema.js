import { z } from 'zod'

// Validation schema for register
export const resgisterSchema = z.object({
    email: z.string().email('The email is not valid'),

    password: z.string().min(8, 'Password must be more than 8 characters'),
})

// Validation schema for login
export const loginSchema = z.object({
  email: z.optional(z.string().email('The email is not valid')),
  password:  z.optional(z.string()),
  code: z.optional(z.string()),
})

// Validation schema for forgot Password
export const forgotPasswordSchema = z.object({
  email: z.string().email('The email is not valid'),
})

// Validation schema for Reset password
export const resetPasswordSchema = z.object({
    password: z.string().min(8, 'Password must be more than 8 characters'),

    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
})
