'use client'
import ProfileSocialLinks from '@/components/shared/user-profile/ProfileSocialLinks'
import ProfileDetails from '@/components/shared/user-profile/ProfileDetails'
import ProfileImage from '@/components/shared/user-profile/ProfileImage'
import ProfileStats from '@/components/shared/user-profile/ProfileStats'
import styles from './ProfileSection.module.css'

/**
 * Profile Section Component
 * Includes user image, details, stats and social links
 */
export default function ProfileSection() {
  return (
    <section className={styles.profileSection}>
      <div className={styles.details}>
        {/* User image component */}
        <ProfileImage styles={styles} width={120} height={120} />
        {/* User details component */}
        <ProfileDetails styles={styles} username={true} bio={true} website={true} />
      </div>
      <div className={styles.stats}>
        {/* User stats component */}
        <ProfileStats styles={styles} followers={true} following={true} />
        {/* User social networks component */}
        <ProfileSocialLinks styles={styles} />
      </div>
    </section>
  )
}
