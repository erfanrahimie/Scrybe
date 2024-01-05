'use server'

import { hasExpiredToken, validateToken } from '@/security/token'

export const validationToken = async (token, type) => {
  if (!token) return { error: 'Missing token!' }

  if (!type) return { error: 'Missing type!' }

  const existingToken = await validateToken(token, type)

  if (!existingToken) return { error: 'Invalid token!' }

  const hasExpired = await hasExpiredToken(existingToken)

  if (hasExpired) return { error: 'Token has expired!' }

  return existingToken
}
