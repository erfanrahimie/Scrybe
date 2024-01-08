'use client'
import { RiHeart3Line, RiEditLine, RiHeart3Fill } from 'react-icons/ri'
import styles from './UserProfile.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { postLike, postUnLike } from '@/actions/post/post-like'
import { userFollow, userUnfollow } from '@/actions/user/user-follow'
import toast from 'react-hot-toast'

/**
 * Profile Section Component
 * Includes user image, details, stats and social links
 */
export default function PostUserProfile({ post }) {
  const { status, data: session } = useSession() // Get session
  const owner = session.user.id === post.user.id
  const [liked, setLiked] = useState(post.likes.some((like) => like.userId === session.user.id))
  const [following, setFollowing] = useState(post.user.followedByIDs.includes(session.user.id))

  // handle Like > like & Unlike
  const handleLike = async () => {
    if (liked) {
      return await postUnLike(post.id, session.user.id)
        .then((data) => {
          if (data?.error) toast.error(res.error)
          if (data?.success) setLiked(false)
        })
        .catch(() => toast.error('Something went wrong'))
    }

    const res = await postLike(post.id, session.user.id)
      .then((data) => {
        if (data?.error) toast.error(res.error)
        if (data?.success) setLiked(true)
      })
      .catch(() => toast.error('Something went wrong'))
  }

  // handle Follow > Follow & Unfollow
  const handleFollow = async () => {
    if (following) {
      return await userUnfollow(session.user.id, post.user.id)
      .then((data) => {
        if (data?.error) toast.error(res.error)
        if (data?.success) setFollowing(false)
      })
      .catch(() => toast.error('Something went wrong'))
    }
    
    return await userFollow(session.user.id, post.user.id)
    .then((data) => {
      if (data?.error) toast.error(res.error)
      if (data?.success) setFollowing(true)
    })
    .catch(() => toast.error('Something went wrong'))
  }

  return (
    <section className={styles.container}>
      {/* User profile details */}
      <Link className={styles.details} href={`/profile/${post.user.username}`}>
        {/* User image */}
        <Image
          className={styles.profileImage}
          src={post.user.image ? post.user.image : '/assets/images/profile.png'}
          width={50}
          height={50}
          alt="profile-image"
        />
        <h2 className={styles.profileUsername}>
          {post.user.username ? post.user.username : 'Anonymous'}
        </h2>
      </Link>
      {/* User profile stats */}
      <div className={styles.stats}>
        {owner ? (
          <Link className={styles.createPost} href={`/post/edit/${post.id}`}>
            <RiEditLine />
          </Link>
        ) : (
          <>
            <button
              className={following ? styles.unFollowButton : styles.followButton}
              onClick={handleFollow}
            >
              {following ? 'Unfollow' : 'follow'}
            </button>
            <button className={styles.likeButton} onClick={handleLike}>
              {liked ? <RiHeart3Fill /> : <RiHeart3Line />}
            </button>
          </>
        )}
      </div>
    </section>
  )
}
