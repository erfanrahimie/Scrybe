import prisma from '@/db/client'

export const getVerificationTokenByToken = async (token) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })
    return verificationToken
  } catch {
    return null
  }
}

export const getVerificationTokenByEmail = async (email, type) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: {
          startsWith: type,
        },
      },
    })
    return verificationToken
  } catch {
    return null
  }
}
