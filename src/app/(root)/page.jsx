import styles from './page.module.css'
import prisma from '@/db/client'
import Posts from '@/components/user-profile/activity/items/Posts'

export default async function Dashboard() {
  const posts = await prisma.post.findMany({
    include: {
      likes: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
          siteLink: true,
          username: true,
          image: true,
          followedByIDs: true,
        },
      },
    },
  })
  return (
    <main className={styles.main}>
      <Posts posts={posts} />
    </main>
  )
}
