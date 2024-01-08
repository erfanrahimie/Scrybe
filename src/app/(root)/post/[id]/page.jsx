import PostDetail from '@/components/post-detail/PostDetail'
import styles from './page.module.css'
import { getSinglePost } from '@/actions/post/get-post'

export default async function ProfilePage({ params }) {
  const res = await getSinglePost(params.id)

  if (res.error) {
    return <main className={styles.main}>NOT FOUND</main>
  }

  return (
    <main className={styles.main}>
      <PostDetail post={res.post} />
    </main>
  )
}
