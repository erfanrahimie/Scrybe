import {
  RiChat3Fill,
  RiChat3Line,
  RiFireFill,
  RiFireLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiQuestionAnswerFill,
  RiQuestionAnswerLine,
  RiSearch2Fill,
  RiSearch2Line,
  RiSettings4Fill,
  RiSettings4Line,
} from 'react-icons/ri'
import { ROOT_ROUTES } from './routes/root'

/**
 * Sidebar menu items data with -> Auth User
 * constant
 * type {Array}
 */
export const AUTH_MENU_ITEMS = [
  // Array of menu items
  {
    icon: <RiChat3Line />,
    iconActive: <RiChat3Fill />,
    href: ROOT_ROUTES.ABOUT,
    text: 'Messages',
  },
  {
    icon: <RiHeart3Line />,
    iconActive: <RiHeart3Fill />,
    href: ROOT_ROUTES.ABOUT,
    text: 'Likes',
  },
  {
    icon: <RiSearch2Line />,
    iconActive: <RiSearch2Fill />,
    href: ROOT_ROUTES.ABOUT,
    text: 'Explore',
  },
  {
    icon: <RiFireLine />,
    iconActive: <RiFireFill />,
    href: ROOT_ROUTES.ABOUT,
    text: 'Trending',
  },
  {
    icon: <RiQuestionAnswerLine />,
    iconActive: <RiQuestionAnswerFill />,
    href: ROOT_ROUTES.ABOUT,
    text: 'Help & Support',
  },
  {
    icon: <RiSettings4Line />,
    iconActive: <RiSettings4Fill />,
    href: ROOT_ROUTES.SETTING,
    text: 'Settings',
  },
]

/**
 * Sidebar menu items data with -> Goust User
 * constant
 * type {Array}
 */
export const GOUST_MENU_ITEMS = [
  // Array of menu items
  {
    icon: <RiSearch2Line />,
    iconActive: <RiSearch2Fill />,
    href: ROOT_ROUTES.ABOUT,
    text: 'Explore',
  },
  {
    icon: <RiFireLine />,
    iconActive: <RiFireFill />,
    href: ROOT_ROUTES.ABOUT,
    text: 'Trending',
  },
  {
    icon: <RiQuestionAnswerLine />,
    iconActive: <RiQuestionAnswerFill />,
    href: ROOT_ROUTES.ABOUT,
    text: 'Help & Support',
  },
]
