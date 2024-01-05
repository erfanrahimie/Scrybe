/**
 * Profile Stats Component
 * Shows user statistics like followers, following
 */
export default function ProfileStats({ styles, followers, following, text = true }) {
  return (
    // Status bar for followers and following
    <ul className={styles.profileStats}>
      {followers && (
        // Display followers count
        <li className={styles.profileStatsItem}>
          <span>60</span> {text && 'followers'}
        </li>
      )}
      {following && (
        // Display following count
        <li className={styles.profileStatsItem}>
          <span>60</span> {text && 'following'}
        </li>
      )}
    </ul>
  )
}
