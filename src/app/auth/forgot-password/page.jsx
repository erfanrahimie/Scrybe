import { AUTH_ROUTES } from '@/constants/routes/auth'
import ForgotPasswordForm from '@/components/auth/forms/forgot-password-form/ForgotPasswordForm'
import AuthPage from '@/components/auth/auth-page/AuthPage'
import styles from './page.module.css'
import Link from 'next/link'
import React from 'react'

export default async function ForgotPasswordPage() {
  const otherOption = (
    <p>
      Do you have an account? <Link href={AUTH_ROUTES.LOGIN}>Sign in</Link>
    </p>
  )

  return (
    <main className={styles.main}>
      <AuthPage
        title={'Forgot password'}
        discription={'please enter your Email'}
        otherOption={otherOption}
      >
        <ForgotPasswordForm />
      </AuthPage>
    </main>
  )
}
