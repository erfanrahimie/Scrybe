import CreatePostForm from '@/components/forms/create-post-form/CreatePostForm'
import styles from './page.module.css'
import { currentUser } from '@/lib/auth'

export default async function PostCreatePage() {
  const user = await currentUser()

  if (!user) {
    return (
      <main className={styles.main}>
        Not accsess
      </main>
    )
  }
  
  return (
    <main className={styles.main}>
      <CreatePostForm userId={user.id}/>
    </main>
  )
}
