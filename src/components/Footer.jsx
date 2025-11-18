import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="#about">About</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
      </div>
      <p className={styles.copy}>
        © {new Date().getFullYear()} GenBridge. All rights reserved.
      </p>
    </footer>
  )
}


