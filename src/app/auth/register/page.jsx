import { AUTH_ROUTES } from '@/constants/routes/auth'
import ProviderButtons from '@/components/auth/provider-buttons/ProviderButtons'
import RegisterForm from '@/components/auth/forms/register-form/RegisterForm'
import AuthPage from '@/components/auth/auth-page/AuthPage'
import styles from './page.module.css'
import Link from 'next/link'

export default async function RegisterPage() {

  const otherOption = (
    <p>
      Do you have an account? <Link href={AUTH_ROUTES.LOGIN}>Sign in</Link>
    </p>
  )

  return (
    <main className={styles.main}>
      <AuthPage
        title={'Sign up'}
        discription={'Thank you for joining us'}
        otherOption={otherOption}
      >
        <ProviderButtons />
        <RegisterForm />
      </AuthPage>
    </main>
  )
}
