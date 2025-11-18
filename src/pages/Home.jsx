import { useState } from 'react'
import VideoSection from '../components/VideoSection.jsx'
import RoleCard from '../components/RoleCard.jsx'
import ClassVideos from '../components/ClassVideos.jsx'
import styles from './Home.module.css'

export default function Home() {
  const [showClassVideos, setShowClassVideos] = useState(null)

  const openClassVideos = (classType) => {
    setShowClassVideos(classType)
  }

  const closeClassVideos = () => {
    setShowClassVideos(null)
  }

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>GenBridge</h1>
          <p className={styles.tag}>Learn. Connect. Grow.</p>
          <p className={styles.subtitle}>
            Smart, gamified learning platform connecting children with parents and teachers
          </p>
        </div>
      </section>

      {/* Main Content Section with Video and Modules */}
      <section className={styles.mainContent}>
        <div className={styles.videoSection}>
          <VideoSection src="/intro.mp4" />
        </div>
        
        <div className={styles.modulesSection}>
          <h2 className={styles.sectionTitle}>Choose Your Role</h2>
          <div className={styles.modulesGrid}>
            <RoleCard role="Child" to="/child">🧸</RoleCard>
            <RoleCard role="Parent" to="/parent">👨‍👩‍👧</RoleCard>
            <RoleCard role="Teacher" to="/teacher">👩‍🏫</RoleCard>
          </div>
        </div>
      </section>

      {/* Class Videos Modal */}
      {showClassVideos && (
        <ClassVideos 
          classType={showClassVideos} 
          onClose={closeClassVideos} 
        />
      )}
    </div>
  )
}


