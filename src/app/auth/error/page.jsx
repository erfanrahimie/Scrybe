import { AUTH_ROUTES } from '@/constants/routes/auth'
import AuthPage from '@/components/auth/auth-page/AuthPage'
import styles from './page.module.css'
import Link from 'next/link'

export default async function AuthErrorPage({ searchParams }) {
  const otherOption = <Link href={AUTH_ROUTES.LOGIN}>Back to login</Link>
  return (
    <main className={styles.main}>
      <AuthPage title={'Login failed‍!'} discription={'Oops! Something went wrong!'} otherOption={otherOption}/>
    </main>
  )
}
