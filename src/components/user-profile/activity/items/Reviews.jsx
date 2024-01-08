import { RiChatOffFill, RiDiscussFill, RiHeart2Line, RiTimeLine } from 'react-icons/ri'
import styles from './Reviews.module.css'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Reviews({ post }) {
  if (!post) {
    return (
      <div className={styles.noPost}>
        <RiDiscussFill className={styles.noPostIcon} />
        <h2 className={styles.noPostTitle}>No Reviews Yet</h2>
      </div>
    )
  }
  
  return (
    <section className={styles.container}>
      <Link href={'/'} className={styles.postLink}>
        <div className={styles.post}>
          <Image
            className={styles.postImage}
            src={'/assets/images/test.jpg'}
            alt="Picture of the author"
            sizes="cover"
            fill
            objectFit="cover"
          />
          <div className={styles.postDescription}>
            <h2 className={styles.postTitle}>
              Lorem ipsum dolor sit amet consetetur adipisicing elit
            </h2>
          </div>
          <div className={styles.postStatus}>
            <span className={styles.postPublish}>
              <RiTimeLine /> 1 week
            </span>
            <span className={styles.postLike}>
              <RiHeart2Line /> 200 K
            </span>
          </div>
        </div>
      </Link>
    </section>
  )
}
