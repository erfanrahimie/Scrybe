import {
  RiCustomerService2Line,
  RiHeart3Line,
  RiLogoutCircleLine,
  RiMessage3Line,
  RiSettings4Line,
  RiUser3Line,
} from 'react-icons/ri';
import { ROOT_ROUTES } from './routes/root';
import { AUTH_ROUTES } from './routes/auth';

/**
 * Sidebar menu items data
 * constant
 * type {Array}
 */
export const SIDEBAR_ITEMS = [
  // Array of menu items
  {
    icon: <RiUser3Line />,
    href: ROOT_ROUTES.HOME,
    text: 'Profile',
  },
  {
    icon: <RiMessage3Line />,
    href: ROOT_ROUTES.HOME,
    text: 'Messages',
  },
  {
    icon: <RiHeart3Line />,
    href: ROOT_ROUTES.HOME,
    text: 'Likes',
  },
  {
    icon: <RiSettings4Line />,
    href: ROOT_ROUTES.HOME,
    text: 'Settings',
  },
  {
    icon: <RiCustomerService2Line />,
    href: ROOT_ROUTES.HOME,
    text: 'Support',
  },
  {
    icon: <RiLogoutCircleLine />,
    href: AUTH_ROUTES.LOGOUT,
    text: 'Logout',
  },
];
