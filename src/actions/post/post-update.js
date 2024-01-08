'use server'

import prisma from "@/db/client"
import { postUpdateSchema } from "@/security/zod/post-schema"

export const postUpdate = async (values, postId) => {
  if (!postId) return { error: 'Missing postId !' }

  const validatedFields = postUpdateSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid fields!' }

  const { title, content } = validatedFields.data

  await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      title,
      content,
    },
  })

  return { success: 'Update post successfully!' }
}
