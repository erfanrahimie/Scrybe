'use client'
import { AUTH_MENU_ITEMS, GOUST_MENU_ITEMS } from '@/constants/sidebar'
import { RiApps2Fill, RiApps2Line } from 'react-icons/ri'
import { ROOT_ROUTES } from '@/constants/routes/root'
import { AUTH_ROUTES } from '@/constants/routes/auth'
import { RiUserReceivedLine } from 'react-icons/ri'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import Skeleton from '@/components/Skeleton'
import styles from './Sidebar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'

/**
 * Main Sidebar Component
 */
export default function Sidebar() {
  const pathName = usePathname() // Get current pathname

  return (
    // Markup for sidebar
    <nav className={styles.sidebar}>

      {/* Show profile & sidebar menu */}
      <SidebarContent />

      {/* Home link */}
      <Link href={ROOT_ROUTES.HOME} className={styles.homeLink}>
        {pathName === ROOT_ROUTES.HOME ? <RiApps2Fill /> : <RiApps2Line />}
      </Link>
    </nav>
  )
}

/**
 * Displays Sidebar content
 */
function SidebarContent() {
  const { status, data: session } = useSession() // Get session

  // loading status session
  if (status === 'loading')
    return (
      <>
        <Skeleton borderRadius={'100%'} width={50} height={50} />
        <Skeleton
          className={styles.sidebarLoading}
          borderRadius={'10px'}
          width={41}
          height={41}
          count={5}
        />
      </>
    )

  // user unauthenticated status 
  if (status === 'unauthenticated')
    return (
      <>
        <Link className={styles.loginUser} href={AUTH_ROUTES.LOGIN}>
          <span className={styles.loginContainer}>
            <RiUserReceivedLine />
          </span>
        </Link>
        <SidebarMenu auth={false} />
      </>
    )

  // user authenticated return 
  return (
    <>
      <Link href={`${'/profile'}/${session?.user?.username}`}>
        <Image
          className={styles.profileImage}
          src={session?.user?.image ? session?.user?.image : '/assets/images/profile.png'}
          width={50}
          height={50}
          alt="profile-image"
        />
      </Link>
      <SidebarMenu auth={true} />
    </>
  )
}

/**
 * Animates element
 * param {HTMLElement} element - Element to animate
 * param {object} properties - GSAP properties
 */
export function animateElement(element, properties) {
  // GSAP animation
  gsap.to(element, {
    ...properties,
    duration: 0.35,
    ease: 'power3.out',
  })
}

/**
 * Main Sidebar Component
 */
export function SidebarMenu({ auth }) {
  const sidebarItem = auth ? AUTH_MENU_ITEMS : GOUST_MENU_ITEMS
  const pathName = usePathname() // Get current pathname
  const menuItemsRef = useRef([]) // Holds animation elements
  const tipTextRef = useRef() // Info text ref
  const [selectedItem, setSelectedItem] = useState(null) // Current menu item

  /**
   * Animates menu item on mouse enter & leave
   * param {number} index - Index of item
   * param {string} status - Enter or leave
   */
  function animateItem(index, status) {
    // check status
    if (status === 'enter') {
      // Set selected item text and its location
      setSelectedItem({
        text: sidebarItem[index].text,
        location: menuItemsRef.current[index].getBoundingClientRect(),
      })

      // GSAP enter animation
      animateElement(tipTextRef.current, { opacity: 1, x: 15 })
    } else if (status === 'leave') {
      // GSAP leave animation
      animateElement(tipTextRef.current, { opacity: 0, x: 0 })
    }
  }

  return (
    <>
      {/* Menu items list */}
      <menu className={styles.menuList}>
        {/* Loop through sidebar items */}
        {sidebarItem.map((item, index) => (
          <li
            key={index}
            // Hover animations
            onMouseEnter={() => animateItem(index, 'enter')}
            onMouseLeave={() => animateItem(index, 'leave')}
            // Active styles
            className={pathName === item.href ? styles.active : ''}
          >
            {/* Item link & icon item */}
            <Link onClick={item.onClick} href={item.href} ref={(el) => menuItemsRef.current.push(el)}>
              {pathName === item.href ? item.iconActive : item.icon}
            </Link>
          </li>
        ))}
      </menu>

      {/* Item tip text */}
      <div
        // Set item location
        style={{
          top: selectedItem && selectedItem.location.top,
          left: selectedItem && selectedItem.location.left + 40,
        }}
        ref={tipTextRef}
        className={styles.tipText}
      >
        {selectedItem && selectedItem.text}
      </div>
    </>
  )
}
