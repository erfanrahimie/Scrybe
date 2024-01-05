'use client'
import { AUTH_ROUTES } from '@/constants/routes/auth'
import { logout } from '@/actions/auth/logout'
import { redirect } from 'next/navigation'

export default async function logoutPage() {
  await logout()
}
