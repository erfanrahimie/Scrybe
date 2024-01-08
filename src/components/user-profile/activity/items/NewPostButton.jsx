import React from 'react'
import styles from './NewPostButton.module.css'
import { RiAddLine } from 'react-icons/ri'
import Link from 'next/link'

export default function NewPostButton() {
  return (
    <Link className={styles.createPost} href={'/post/create'}><RiAddLine /></Link>
  )
}
