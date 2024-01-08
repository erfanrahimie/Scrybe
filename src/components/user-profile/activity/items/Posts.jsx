import React from 'react'
import styles from './Posts.module.css'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'
import abbreviateNumber from '@/lib/abbreviateNumber'
import { RiHeart2Line, RiPenNibFill, RiTimeLine } from 'react-icons/ri'

dayjs.extend(relativeTime)

export default function Posts({ posts }) {

  if (posts.error) {
    return (
      <div className={styles.noPost}>
        <h2 className={styles.noPostTitle}>Server error</h2>
      </div>
    )
  }

  if (posts.noPost) {
    return (
      <div className={styles.noPost}>
        <RiPenNibFill className={styles.noPostIcon} />
        <h2 className={styles.noPostTitle}>No Posts Yet</h2>
      </div>
    )
  }
  
  const reversedPosts = [...posts].reverse() 

  return (
    <section className={styles.container}>
      {reversedPosts.map((post, index) => (
        <Link key={index} href={`/post/${post.id}`} className={styles.postLink}>
          <div className={styles.post}>
            <Image
              className={styles.postImage}
              src={post.image ? post.image : '/assets/images/Image_not_available.png'}
              alt="Picture of the author"
              sizes="cover"
              fill
              objectFit="cover"
            />
            <div className={styles.postDescription}>
              <h2 className={styles.postTitle}>{post.title}</h2>
            </div>
            <div className={styles.postStatus}>
              <span className={styles.postPublish}>
                <RiTimeLine /> {dayjs(post.createdAt).fromNow().replace(' ago', '')}
              </span>
              <span className={styles.postLike}>
                <RiHeart2Line /> {abbreviateNumber(post.likes.length)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}
