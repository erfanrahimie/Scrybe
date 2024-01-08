'use client'
import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { postCreateSchema } from '@/security/zod/post-schema'
import styles from './CreatePostForm.module.css'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { postCreate } from '@/actions/post/post-create'

export default function PostCreateForm({ userId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(postCreateSchema) })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    return await postCreate(data, userId)
      .then((data) => {
        if (data?.error) {
          setError(data.error)
        }

        if (data?.success) {
          reset()
          toast.success(data.success)
          router.push(`/post/${data.post.id}`)
        }
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.pageTitle}>Create Post</h1>
      <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
        <input disabled={isSubmitting} type="text" placeholder="Title" {...register('title')} />
        {errors.title && <p className={styles.formError}>{errors.title.message}</p>}
        <textarea disabled={isSubmitting} placeholder="Content" {...register('content')} />
        {errors.content && <p className={styles.formError}>{errors.content.message}</p>}

        <FormError message={error} />
        <FormSuccess message={success} />
        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          Create Post
        </button>
      </form>
    </section>
  )
}
