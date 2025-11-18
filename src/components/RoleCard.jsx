import { Link } from 'react-router-dom'
import styles from './RoleCard.module.css'

export default function RoleCard({ role, to, children }) {
  return (
    <Link to={to} className={`${styles.card} card`}>
      <div className={styles.icon}>{children}</div>
      <h3 className={styles.title}>{role}</h3>
    </Link>
  )
}


