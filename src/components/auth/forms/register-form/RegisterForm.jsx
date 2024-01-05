'use client'
import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { register as registerUser } from '@/actions/auth/register'
import { resgisterSchema } from '@/security/zod/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { AUTH_ROUTES } from '@/constants/routes/auth'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from './RegisterForm.module.css'
import toast from 'react-hot-toast'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resgisterSchema) })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    await registerUser(data)
      .then((data) => {
        setError(data?.error)
        if (data?.success) {
          toast.success(data.success)
          return router.push(AUTH_ROUTES.LOGIN)
        }
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <input disabled={isSubmitting} type="text" placeholder="Email" {...register('email')} />
      {errors.email && <p className={styles.formError}>{errors.email.message}</p>}
      <input disabled={isSubmitting} type="password" placeholder="Password (6+ characters)" {...register('password')} />
      {errors.password && <p className={styles.formError}>{errors.password.message}</p>}
      <FormError message={error} />
      <FormSuccess message={success} />
      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
        Sign up
      </button>
    </form>
  )
}
