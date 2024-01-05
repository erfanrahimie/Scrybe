'use client'
import { ROOT_ROUTES } from '@/constants/routes/root'
import { SIDEBAR_ITEMS } from '@/constants/sidebar'
import { usePathname } from 'next/navigation'
import { RiApps2Line } from 'react-icons/ri'
import { useRef, useState } from 'react'
import UserImage from '@/components/shared/user-profile/ProfileImage'
import styles from './Sidebar.module.css'
import Link from 'next/link'
import gsap from 'gsap'

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
export default function Sidebar() {
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
        text: SIDEBAR_ITEMS[index].text,
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
    // Markup for sidebar
    <nav className={styles.sidebar}>
      {/* Profile image */}
      <UserImage styles={styles} width={50} height={50} showLogin={true}/>

      {/* Menu items list */}
      <menu className={styles.menuList}>
        {/* Loop through sidebar items */}
        {SIDEBAR_ITEMS.map((item, index) => (
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
              {item.icon}
            </Link>
          </li>
        ))}
      </menu>

      {/* Home link */}
      <Link href={ROOT_ROUTES.HOME} className={styles.homeLink}>
        <RiApps2Line />
      </Link>

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
    </nav>
  )
}
