import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { AUTH_ROUTES } from '@/constants/routes/auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { getAccountByUserId } from '@/data/account'
import { getUserById, getUserByUsername } from '@/data/user'
import authConfig from '@/security/auth.config'
import NextAuth from 'next-auth'
import prisma from '@/db/client'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: AUTH_ROUTES.LOGIN,
    error: AUTH_ROUTES.ERROR,
  },

  events: {
    async linkAccount({ user }) {
      if (!user.username && user.email) {
        const email = user.email
        const emailPrefix = email.split('@')[0]

        let username = emailPrefix
        let exists

        do {
          // Generate random number
          const randomStr = await crypto.randomBytes(6).toString('hex')

          username = `${emailPrefix}_${randomStr}`

          // Check if username exists
          exists = await getUserByUsername(username)

        } while (exists)

        // Save generated username
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            username,
            data: { emailVerified: new Date() },
          },
        })
      }
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id)

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) return false

        // Delete two factor confirmation for next sign in
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        })
      }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.username = token.username
        session.user.isOAuth = token.isOAuth
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.username = existingUser.username
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
