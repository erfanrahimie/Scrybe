import { RiDiscordLine, RiTwitterLine, RiInstagramLine, RiGithubLine } from 'react-icons/ri'

/**
 * Profile Social Links Component
 * Displays links to user social profiles
 */
export default function ProfileSocialLinks({ styles }) {
  return (
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
  )
}
