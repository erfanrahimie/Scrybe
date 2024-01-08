import prisma from '@/db/client'

export const getLikeByPostIdAndUserId = async (postId, userId) => {
  try {
    const like = await prisma.like.findFirst({
      where: {  
        postId,
        userId
      } 
    })
    return like
  } catch {
    return null
  }
}
