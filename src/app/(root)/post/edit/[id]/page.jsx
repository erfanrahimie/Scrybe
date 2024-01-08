import UpdatePostForm from '@/components/forms/update-post-form/UpdatePostForm'
import { getPostByIdAndUserId } from '@/data/post'
import { currentUser } from '@/lib/auth'
import styles from './page.module.css'

export default async function PostEditPage({ params }) {
  const user = await currentUser()

  const post = await getPostByIdAndUserId(params.id, user.id)

  if (!user || !post) return <main className={styles.main}>Not accsess</main>

  return (
    <main className={styles.main}>
      <UpdatePostForm post={post} />
    </main>
  )
}
