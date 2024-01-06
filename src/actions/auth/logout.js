'use server'

import { signOut } from '@/security/auth'

export const logout = async () => {
  await signOut({ callbackUrl: 'http://localhost:3000/auth/login' })
}
