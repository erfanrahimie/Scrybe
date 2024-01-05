import prisma from '@/db/client'

export const getAccountByUserId = async (userId) => {
  try {
    const account = await prisma.account.findFirst({
      where: { userId },
    })
    return account
  } catch {
    return null
  }
}
