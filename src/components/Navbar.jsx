import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar({ cursorCharacter = 'cat', setCursorCharacter = () => {}, cursorEnabled = true, setCursorEnabled = () => {} }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <Link to="/" className={styles.logo}>GenBridge</Link>
        <span className={styles.tagline}>Learn. Connect. Grow.</span>
      </div>

      <nav className={styles.links}>
        {/* Cursor controls */}
        
      </nav>
    </header>
  )
}


