import styles from './VideoSection.module.css'

export default function VideoSection({ src }) {
  return (
    <section className={styles.videoWrap}>
      <video className={styles.video} src={src} autoPlay muted loop playsInline />
    </section>
  )
}


