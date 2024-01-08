'use server'
import { update } from '@/security/auth'
import { getUserById, getUserByUsernameOnlyUser } from '@/data/user'
import { currentUser } from '@/lib/auth'
import prisma from '@/db/client'
import { settingsSchema } from '@/security/zod/auth-schema'

export const settings = async (values) => {

  const validatedFields = settingsSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid fields!' }

  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: 'Unauthorized' }
  }

  if (values.username && values.username !== user.username) {
    const existingUser = await getUserByUsernameOnlyUser(values.username)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Username already in use!' }
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  })

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
    },
  })

  return { success: 'Settings Updated!' }
}
