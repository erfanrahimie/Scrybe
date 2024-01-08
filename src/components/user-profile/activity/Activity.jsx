'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import NewPostButton from './items/NewPostButton'
import styles from './Activity.module.css'
import Reviews from './items/Reviews'
import Posts from './items/Posts'
import { userFollow, userUnfollow } from '@/actions/user/user-follow'
import toast from 'react-hot-toast'
import { logout } from '@/actions/auth/logout'
import { useRouter } from 'next/navigation'

export default function Activity({ username, posts, user }) {
  const { status, data: session } = useSession() // Get session
  const [following, setFollowing] = useState(user.followers.includes(session.user.id))
  const router = useRouter()

  // handle Follow > Follow & Unfollow
  const handleFollow = async () => {
    if (following) {
      return await userUnfollow(session.user.id, user.id)
        .then((data) => {
          if (data?.error) toast.error(res.error)
          if (data?.success) setFollowing(false)
        })
        .catch(() => toast.error('Something went wrong'))
    }

    return await userFollow(session.user.id, user.id)
      .then((data) => {
        if (data?.error) toast.error(res.error)
        if (data?.success) setFollowing(true)
      })
      .catch(() => toast.error('Something went wrong'))
    
  }
  
  const logouHandel = async () => {
    await logout()
    return router.push('/auth/login')
  }

  // const user = currentUser()
  const isOwner = session?.user?.username === username

  const [activeTab, setActiveTab] = useState('posts')

  return (
    <section className={styles.container}>
      <div className={styles.topBar}>
        <menu className={styles.menu}>
          <li
            className={`${styles.menuItem} ${activeTab === 'posts' ? styles.active : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </li>
          <li
            className={`${styles.menuItem} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </li>
        </menu>
        <div className={styles.userFeatures}>
          {isOwner ? (
            <>
              <NewPostButton />
              <button className={styles.logout} onClick={logouHandel}>
                Logout
              </button>
            </>
          ) : (
            <button
              className={following ? styles.unFollowButton : styles.followButton}
              onClick={handleFollow}
            >
              {following ? 'Unfollow' : 'follow'}
            </button>
          )}
        </div>
      </div>

      {activeTab === 'posts' && <Posts posts={posts} />}

      {activeTab === 'reviews' && <Reviews username={username} />}
    </section>
  )
}
