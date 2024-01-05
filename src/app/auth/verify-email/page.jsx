import { emailVerify } from '@/actions/auth/email-verify'
import { AUTH_ROUTES } from '@/constants/routes/auth'
import { RiMailCheckLine } from 'react-icons/ri'
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

export default async function verifyEmailPage({ searchParams }) {
  const otherOption = (
    <p>
      Do you want to enter the account? <Link href={AUTH_ROUTES.LOGIN}>Sign in</Link>
    </p>
  )

  if (searchParams.token) {
    const data = await emailVerify(searchParams.token)

    if (!data.success) {
      return <Page title={data.error} discription={'Enter a valid token!'} />
    }

    return (
      <Page
        title={'Email is verified'}
        discription={'Welcome dear friend'}
        otherOption={otherOption}
      >
        <div className={styles.checkVerifyEmail}>
          <RiMailCheckLine />
        </div>
      </Page>
    )
  } else {
    return <Page title={'Missing token!'} discription={'No token available...'} />
  }
}
