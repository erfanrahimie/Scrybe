import React from 'react'
import styles from './PostDetail.module.css'
import Image from 'next/image'
import PostUserProfile from './items/UserProfile'

export default function PostDetail({ post }) {
  return (
    <section className={styles.container}>
      <Image
        className={styles.postImage}
        src={post.image ? post.image : '/assets/images/Image_not_available.png'}
        alt="Picture of the author"
        sizes="cover"
        fill
        objectFit="cover"
      />
      <PostUserProfile post={post} />
      <div className={styles.postDetail}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postContent}>{post.content}</p>
      </div>
    </section>
  )
}
