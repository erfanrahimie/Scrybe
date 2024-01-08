'use client'
import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from './SettingForm.module.css'
import toast from 'react-hot-toast'
import { settings } from '@/actions/auth/setting'
import { settingsSchema } from '@/security/zod/auth-schema'

export default function SettingForm({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(settingsSchema), defaultValues:{
    username: user.username,
    name: user.name,
    bio: user.bio,
    siteLink: user.siteLink
  }})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    return await settings(data)
      .then((data) => {
        if (data?.error) {
          setError(data.error)
        }

        if (data?.success) {
          setSuccess(data.success)
        }
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.pageTitle}>Setting</h1>
      <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
        <input disabled={isSubmitting} type="text" placeholder="Username" {...register('username')} />
        {errors.username && <p className={styles.formError}>{errors.username.message}</p>}
        <input disabled={isSubmitting} type="text" placeholder="name" {...register('name')} />
        {errors.name && <p className={styles.formError}>{errors.name.message}</p>}
        <input disabled={isSubmitting} type="text" placeholder="bio" {...register('bio')} />
        {errors.bio && <p className={styles.formError}>{errors.bio.message}</p>}
        <input disabled={isSubmitting} type="text" placeholder="site link" {...register('siteLink')} />
        {errors.siteLink && <p className={styles.formError}>{errors.siteLink.message}</p>}

        <FormError message={error} />
        <FormSuccess message={success} />
        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          Update profile
        </button>
      </form>
    </section>
  )
}
