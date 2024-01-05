import styles from './AuthPage.module.css'

export default function AuthPage({ title, discription, otherOption, children }) {
  return (
    <section className={styles.auth}>
      {title && <h1 className={styles.pageTitle}>{title}</h1>}
      {discription && <p className={styles.pageDiscription}>{discription}</p>}
      {children && <div className={styles.signinOption}>{children}</div>}
      {otherOption && <div className={styles.otherOption}>{otherOption}</div>}
    </section>
  )
}
