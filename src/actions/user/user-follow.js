'use server'
import { getFollow } from '@/data/user'
import prisma from '@/db/client'

export const userFollow = async (userId, followedUserId) => {
  if (!userId || !followedUserId) return { error: 'Missing username!' }

  const follow = await getFollow(userId, followedUserId)

  if (follow) return { error: 'Already follow user' }

  await prisma.user.update({
    where: { id: userId },
    data: {
      following: {
        connect: {
          id: followedUserId
        }
      }
    }
  })

  return { success: 'Successfully follow' }
}

export const userUnfollow = async (userId, followedUserId) => {
  if (!userId || !followedUserId) return { error: 'Missing username!' }

  const follow = await getFollow(userId, followedUserId)

  if (!follow) return { error: 'Already Unfollow user' }

  await prisma.user.update({
    where: { id: userId },
    data: {
      following: {
        disconnect: {
          id: followedUserId,
        },
      },
    },
  })

  return { success: 'Successfully unfollow' }
}
