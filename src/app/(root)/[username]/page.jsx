import ProfileSection from '@/components/user-profile/profile-section/ProfileSection'
import styles from './page.module.css'

export default function Dashboard() {
  return (
    <main className={styles.main}>
      <ProfileSection />
    </main>
  )
}
