import { RiCustomerService2Line, RiLink } from 'react-icons/ri'
import Link from 'next/link'

/**
 * Profile Details Component
 * Displays user details like name, bio, website
 */
export default function ProfileDetails({
  styles,
  username,
  bio,
  website,
  usernameIcon = true,
  websitelinkIcon = true,
}) {
  return (
    <div className={styles.profileDetails}>
      {username && (
        // Display user name with icon
        <h2 className={styles.profileUsername}>
          ERFAN {usernameIcon && <RiCustomerService2Line />}
        </h2>
      )}
      {bio && (
        // Display user bio
        <p className={styles.profileBio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmz
        </p>
      )}
      {website && (
        // Display website link
        <Link href={'https://www.instagram.com/nex_nahira/'} className={styles.profileWebsiteLink}>
          {websitelinkIcon && <RiLink />} instagram.com/nex_nahira
        </Link>
      )}
    </div>
  )
}
