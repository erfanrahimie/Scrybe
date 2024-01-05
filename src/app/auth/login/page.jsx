import { AUTH_ROUTES } from '@/constants/routes/auth'
import ProviderButtons from '@/components/auth/provider-buttons/ProviderButtons'
import LoginForm from '@/components/auth/forms/login-form/LoginForm'
import AuthPage from '@/components/auth/auth-page/AuthPage'
import styles from './page.module.css'
import Link from 'next/link'

export default async function LoginPage() {
  const otherOption = (
    <>
      <Link href={AUTH_ROUTES.FORGOT_PASSWORD}>Forget password</Link>
      <p>
        Dont have an account? <Link href={AUTH_ROUTES.REGISTER}>Sign up</Link>
      </p>
    </>
  )

  return (
    <main className={styles.main}>
      <AuthPage title={'Sign in'} discription={'Welcome back'} otherOption={otherOption}>
        <ProviderButtons />
        <LoginForm />
      </AuthPage>
    </main>
  )
}
