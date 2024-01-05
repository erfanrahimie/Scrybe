'use client'
import { RiGithubFill, RiGoogleFill } from 'react-icons/ri'
import { useSearchParams } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from 'next-auth/react'
import styles from './ProviderButtons.module.css'

export default function ProviderButtons() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const signInWithProvider = (type) => {
    signIn(type, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className={styles.signinbuttons}>
      <button onClick={() => signInWithProvider('google')}>
        <RiGoogleFill />
      </button>
      <button onClick={() => signInWithProvider('github')}>
        <RiGithubFill />
      </button>
    </div>
  )
}
