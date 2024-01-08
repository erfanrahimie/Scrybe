import prisma from '@/db/client'

export const getUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        posts: {
          include: {
            likes: true,
          },
        },
      },
    })
    return user
  } catch {
    return null
  }
}

export const getUserByUsernameOnlyUser = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    })
    return user
  } catch {
    return null
  }
}

export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}

export const getFollow = async (userId, followedUserId) => {
  try {
    const follow = await prisma.user.findFirst({
      where: {  
        id: userId,
        following: {
          some: {
            id: followedUserId  
          }
        }
      } 
    })
    return follow
  } catch {
    return null
  }
}