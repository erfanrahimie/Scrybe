import { z } from 'zod'

// Validation schema for post create
export const postCreateSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10),
})

// Validation schema for post update
export const postUpdateSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10),
})