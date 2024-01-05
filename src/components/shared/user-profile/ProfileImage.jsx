'use client'
import { AUTH_ROUTES } from '@/constants/routes/auth'
import { RiUserReceivedLine } from 'react-icons/ri'
import { useSession } from 'next-auth/react'
import Skeleton from '@/components/Skeleton'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Displays user profile image
 */
export default function ProfileImage({ styles, width, height, showLogin}) {
  const { status, data: session } = useSession()

  if (status === 'loading') return <Skeleton borderRadius={'100%'} width={width} height={height} />

  if (status === 'unauthenticated' && showLogin)
    return (
      <Link className={styles.loginUser} href={AUTH_ROUTES.LOGIN}>
        <RiUserReceivedLine />
      </Link>
    )

  return (
    <Image
      className={styles.profileImage}
      src={session?.user?.image ? session?.user?.image : '/assets/images/profile.png'}
      width={width}
      height={height}
      alt="profile-image"
    />
  )
}
