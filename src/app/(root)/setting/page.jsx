import { currentUser } from '@/lib/auth'
import styles from './page.module.css'
import SettingForm from '@/components/auth/forms/setting-form/SettingForm'
import { getUserById } from '@/data/user'

export default async function PostCreatePage() {
  const user = await currentUser()

  if (!user) {
    return (
      <main className={styles.main}>
        Not accsess
      </main>
    )
  }

  const thisUser = await getUserById(user.id)

  return (
    <main className={styles.main}>
      <SettingForm user={thisUser} />
    </main>
  )
}
