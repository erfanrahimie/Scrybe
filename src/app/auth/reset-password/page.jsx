import { validationToken } from '@/security/validation-token'
import { AUTH_ROUTES } from '@/constants/routes/auth'
import ResetPasswordForm from '@/components/auth/forms/reset-password-form/ResetPasswordForm'
import AuthPage from '@/components/auth/auth-page/AuthPage'
import styles from './page.module.css'
import Link from 'next/link'

const Page = ({ title, discription, otherOption, children }) => {
  return (
    <main className={styles.main}>
      <AuthPage title={title} discription={discription} otherOption={otherOption}>
        {children}
      </AuthPage>
    </main>
  )
}

export default async function ResetPasswordPage({ searchParams }) {
  const otherOption = <Link href={AUTH_ROUTES.FORGOT_PASSWORD}>Forget password</Link>

  if (searchParams.token) {
    
    const tokenValidation = await validationToken(searchParams.token, 'pass_')

    if (tokenValidation?.error) {
      return (
        <Page
          title={tokenValidation.error}
          discription={'Please try again...'}
          otherOption={otherOption}
        />
      )
    }

    return (
      <Page title={'Reset password'} discription={'Create your new password'}>
        <ResetPasswordForm token={searchParams.token} />
      </Page>
    )
  } else {
    return (
      <Page
        title={'Missing token!'}
        discription={'No token available...'}
        otherOption={otherOption}
      />
    )
  }
}
