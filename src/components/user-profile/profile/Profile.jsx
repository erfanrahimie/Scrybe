import {
  RiLink,
  RiDiscordLine,
  RiTwitterLine,
  RiInstagramLine,
  RiGithubLine,
} from 'react-icons/ri'
import styles from './Profile.module.css'
import Image from 'next/image'
import Link from 'next/link'
import abbreviateNumber from '@/lib/abbreviateNumber'

/**
 * Profile Section Component
 * Includes user image, details, stats and social links
 */
export default async function Profile({ user }) {
  
  return (
    <section className={styles.container}>
      {/* User profile details */}
      <div className={styles.details}>
        {/* User image */}
        <Image
          className={styles.profileImage}
          src={user.image ? user.image : '/assets/images/profile.png'}
          width={150}
          height={150}
          alt="profile-image"
        />

        {/* User details */}
        <div className={styles.profileDetails}>
          <h2 className={styles.profileUsername}>
            {user.name ? user.name : 'Anonymous'}
          </h2>
          {user.bio && <p className={styles.profileBio}>{user.bio}</p>}
          {user.siteLink && (
            <Link href={user.siteLink} className={styles.profileWebsiteLink}>
              <RiLink /> {user.siteLink.split('//')[1]}
            </Link>
          )}
        </div>
      </div>

      {/* User profile stats */}
      <div className={styles.stats}>
        {/* User following & followers */}
        <ul className={styles.profileStats}>
          <li className={styles.profileStatsItem}>
            <span>{abbreviateNumber(user.followers.length)}</span> followers
          </li>
          <li className={styles.profileStatsItem}>
            <span>{abbreviateNumber(user.following.length)}</span> following
          </li>
        </ul>

        {/* User social networks */}
        <div className={styles.profileSocialLinks}>
          <a href="">
            <RiDiscordLine />
          </a>
          <a href="">
            <RiTwitterLine />
          </a>
          <a href="">
            <RiInstagramLine />
          </a>
          <a href="">
            <RiGithubLine />
          </a>
        </div>
      </div>
    </section>
  )
}
