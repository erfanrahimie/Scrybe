'use client'
import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { forgotPasswordSchema } from '@/security/zod/auth-schema'
import { forgotPassword } from '@/actions/auth/forgot-password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from './ForgotPasswordForm.module.css'

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    return await forgotPassword(data)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <input disabled={isSubmitting} type="text" placeholder="Email" {...register('email')} />
      {errors.email && <p className={styles.formError}>{errors.email.message}</p>}
      <FormError message={error} />
      <FormSuccess message={success} />
      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
        Send email
      </button>
    </form>
  )
}
