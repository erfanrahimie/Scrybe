import Activity from '@/components/user-profile/activity/Activity'
import Profile from '@/components/user-profile/profile/Profile'
import styles from './page.module.css'
import { userProfile } from '@/actions/user/user-profile'

export default async function ProfilePage({ params }) {
  const res = await userProfile(params.username)

  if (res.error) {
    return (
      <main className={styles.main}>
        TEST
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Profile user={res.user} />
      <Activity username={params.username} posts={res.posts} user={res.user}/>
    </main>
  )
}
