import { RiCheckboxCircleLine, RiCloseCircleLine, RiErrorWarningLine, RiInformationLine } from 'react-icons/ri'
import styles from './Message.module.css'

export function FormError({ message }) {
  if (!message) return null

  return (
    <div className={styles.formError}>
      <RiCloseCircleLine />
      <p>{message}</p>
    </div>
  )
}

export function FormSuccess({ message }) {
  if (!message) return null

  return (
    <div className={styles.formSuccess}>
      <RiCheckboxCircleLine />
      <p>{message}</p>
    </div>
  )
}

export function FormInfo({ message }) {
  if (!message) return null

  return (
    <div className={styles.formInfo}>
      <RiInformationLine />
      <p>{message}</p>
    </div>
  )
}

export function FormWarning({ message }) {
  if (!message) return null

  return (
    <div className={styles.formWarning}>
      <RiErrorWarningLine />
      <p>{message}</p>
    </div>
  )
}
