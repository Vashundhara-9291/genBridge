import { useState, useEffect } from 'react'
import styles from './ClassVideos.module.css'

export default function ClassVideos({classType, onClose }) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [classTypes, setClassTypes] = useState(classType)
  
  

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch('/data/learning_videos.json')
        const data = await response.json()
        setVideos(data[classTypes] || [])
      } catch (error) {
        console.error('Error loading videos:', error)
        setVideos([])
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [classTypes])

  const getClassTitle = () => {
    switch (classTypes) {
      case 'nursery':
        return 'Nursery Learning Videos English'
      case 'nurseryHindi':
        return 'Nursery Learning Videos Hindi'
      case 'nurseryMaths':
        return 'Nursery Learning Videos Maths'
      case 'class1':
        return 'Class 1 Learning Videos'
      case 'class1Hindi':
        return 'Class 1 Learning Videos Hindi'
      case 'class1Maths':
        return 'Class 1 Learning Videos Maths'
      default:
        return 'Learning Videos'
    }
  }





  const getClassEmoji = () => {
    switch (classType) {
      case 'nursery':
        return '🧒'
      case 'class1':
        return '👧'
      default:
        return '📚'
    }
  }

  if (loading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading videos...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.header}>

          <h2 className={styles.title}>
            {getClassEmoji()} {getClassTitle()}

          </h2>
      <ul style={{display:"flex", listStyle:"none", columnGap:"15px", cursor:"pointer", fontWeight:"bold"}}>
        <li onClick={()=>classType=="nursery"?setClassTypes("nurseryMaths"):setClassTypes("class1Maths")}>Maths</li>
        <li onClick={()=>classType=="nursery"?setClassTypes("nursery"):setClassTypes("class1")}>English</li>
        <li onClick={()=>classType=="nursery"?setClassTypes("nurseryHindi"):setClassTypes("class1Hindi")}>Hindi</li>
        </ul>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
          
        </div>
        
        <div className={styles.videoGrid}>
      
          {videos.map((video) => (
            <div key={video.id} className={styles.videoCard}>
              <div className={styles.thumbnail}>
               
                <video className={styles.thumbnail} src={video.video} controls ></video>
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.videoDescription}>{video.description}</p>
                <div className={styles.videoMeta}>
                  <span className={styles.subject}>{video.subject}</span>
                  <span className={styles.age}>Age: {video.age}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {videos.length === 0 && (
          <div className={styles.noVideos}>
            <p>No videos available for this class yet.</p>
            <p>More content coming soon! 🎉</p>
          </div>
        )}
      </div>
    </div>
  )
}
