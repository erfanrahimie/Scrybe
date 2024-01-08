'use client'
import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { postCreateSchema } from '@/security/zod/post-schema'
import styles from './UpdatePostForm.module.css'
import toast from 'react-hot-toast'
import { postUpdate } from '@/actions/post/post-update'
import { useRouter } from 'next/navigation'

export default function UpdatePostForm({ post }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(postCreateSchema), defaultValues: {
    title: post.title,
    content: post.content
  } })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    return await postUpdate(data, post.id)
      .then((data) => {
        if (data?.error) {
          setError(data.error)
        }

        if (data?.success) {
          toast.success(data.success)
          router.push(`/post/${post.id}`)
        }
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.pageTitle}>Update Post</h1>
      <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
        <input disabled={isSubmitting} type="text" placeholder="Title" {...register('title')} />
        {errors.title && <p className={styles.formError}>{errors.title.message}</p>}
        <textarea disabled={isSubmitting} placeholder="Content" {...register('content')} />
        {errors.content && <p className={styles.formError}>{errors.content.message}</p>}

        <FormError message={error} />
        <FormSuccess message={success} />
        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          Update Post
        </button>
      </form>
    </section>
  )
}
