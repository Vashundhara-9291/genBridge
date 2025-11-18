import { useEffect, useState } from 'react'
import styles from './ElderPortal.module.css'

export default function ElderPortal() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [audio, setAudio] = useState(null)
  const [tag, setTag] = useState('Values')
  const [previewOn, setPreviewOn] = useState(false)

  useEffect(() => {
    let id
    if (previewOn) {
      id = setInterval(() => {
        // simple shimmer animation tick placeholder
      }, 500)
    }
    return () => clearInterval(id)
  }, [previewOn])

  const onAudio = (e) => {
    const file = e.target.files?.[0]
    if (file) setAudio(URL.createObjectURL(file))
  }

  return (
    <div className={styles.wrap}>
      <h2>Elder Portal</h2>
      <section className={styles.grid}>
        <div className={styles.card}>
          <h3>Share Your Story</h3>
          <div className={styles.row}><label>Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className={styles.row}><label>Text</label><textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} /></div>
          <div className={styles.row}><label>Audio</label><input type="file" accept="audio/*" onChange={onAudio} /></div>
          {audio && <audio controls src={audio} className={styles.audio} />}
          <div className={styles.row}><label>Tag</label>
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option>Values</option>
              <option>Nature</option>
              <option>History</option>
            </select>
          </div>
          <button className={styles.primary} onClick={() => setPreviewOn(!previewOn)}>{previewOn ? 'Stop Preview' : 'Preview Animation'}</button>
        </div>

        <div className={styles.card}>
          <h3>Animated Story Preview</h3>
          <div className={`${styles.preview} ${previewOn ? styles.play : ''}`}>
            <div className={styles.scene}>
              <div className={styles.sun} />
              <div className={styles.hill} />
              <div className={styles.tree} />
            </div>
            <div className={styles.caption}>{title || 'Your story title'}</div>
          </div>
        </div>
      </section>
    </div>
  )
}


