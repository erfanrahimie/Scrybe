import prisma from '@/db/client'

export const getPostById = async (id) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        likes: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            siteLink: true,
            username: true,
            image: true,
            followedByIDs: true,
          },
        },
      },
    })
    return post
  } catch {
    return null
  }
}

export const getPostByIdAndUserId = async (id, userId) => {
  try {
    const post = await prisma.post.findUnique({ where: { id, userId }})
    return post
  } catch {
    return null
  }
}

