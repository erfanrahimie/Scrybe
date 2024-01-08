'use server'

import prisma from "@/db/client"
import { postCreateSchema } from "@/security/zod/post-schema"

export const postCreate = async (values, userId) => {
  if (!userId) return { error: 'Missing userId !' }

  const validatedFields = postCreateSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid fields!' }

  const { title, content } = validatedFields.data

  const post = await prisma.post.create({
    data: {
      title,
      content,
      userId: userId
    },
  })

  return { success: 'Create post successfully!', post}
}
