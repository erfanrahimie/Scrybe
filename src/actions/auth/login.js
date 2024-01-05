'use server'
import {
  deleteToken,
  generateTwoFactorToken,
  generateVerifyEmailToken,
  hasExpiredToken,
  validateToken,
} from '@/security/token'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { sendEmailTwoFactor, sendEmailVerifyEmail } from '@/emails/sendEmail'
import { loginSchema } from '@/security/zod/auth-schema'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { getUserByEmail } from '@/data/user'
import { AuthError } from 'next-auth'
import { signIn } from '@/security/auth'
import prisma from '@/db/client'
import bcrypt from 'bcryptjs'

export const login = async (values, callbackUrl) => {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid fields!' }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email or password is incorrect!' }
  }

  const passwordsMatch = await bcrypt.compare(password, existingUser.password)

  if (!passwordsMatch) return { error: 'Email or password is incorrect' }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerifyEmailToken(existingUser.email)

    await sendEmailVerifyEmail(verificationToken.identifier, verificationToken.token)

    return { success: 'Confirmation email sent!' }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await validateToken('2fa_' + code, '2fa_')

      if (!twoFactorToken) return { error: 'Invalid code!' }

      const hasExpired = await hasExpiredToken(twoFactorToken)

      if (hasExpired) return { error: 'Code expired!' }

      await deleteToken(twoFactorToken)

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        })
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendEmailTwoFactor(twoFactorToken.identifier, twoFactorToken.token.replace('2fa_', ''))

      return { twoFactor: true }
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
