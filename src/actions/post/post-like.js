'use server'

import { getLikeByPostIdAndUserId } from "@/data/like"
import prisma from "@/db/client"

export const postLike = async (postId, userId) => {
  if (!postId || !userId) return { error: 'Missing parametr!' }

  const like = await getLikeByPostIdAndUserId(postId, userId)
  
  if (like) return { error: 'Already like post' }

  await prisma.like.create({
    data: {
      postId,
      userId
    },
  })

  return { success: 'Successfully like' }
}

export const postUnLike = async (postId, userId) => {
  if (!postId || !userId) return { error: 'Missing parametr!' }

  const like = await getLikeByPostIdAndUserId(postId, userId)

  if (!like) return { error: 'Already Unlike post' }

  await prisma.like.delete({
    where: {  
      id: like.id
    } 
  })

  return { success: 'Successfully unlike' }
}
