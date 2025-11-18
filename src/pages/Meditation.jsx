import { useState, useEffect, useRef } from 'react'
import styles from './Meditation.module.css'

export default function Meditation() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const audioRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false)
            setIsCompleted(true)
            setShowReward(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isPlaying, timeLeft])

  const startMeditation = () => {
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.play().catch(console.error)
    }
  }

  const pauseMeditation = () => {
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const resetMeditation = () => {
    setIsPlaying(false)
    setTimeLeft(300)
    setIsCompleted(false)
    setShowReward(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    return ((300 - timeLeft) / 300) * 100
  }

  return (
    <div className={styles.meditationContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>🧘‍♀️ Meditation Time</h1>
        <p className={styles.subtitle}>Take a peaceful break and relax your mind</p>
      </div>

      <div className={styles.meditationCard}>
        <div className={styles.timerSection}>
          <div className={styles.timer}>
            <div className={styles.timeDisplay}>
              {formatTime(timeLeft)}
            </div>
            <div className={styles.progressRing}>
              <svg className={styles.progressSvg} viewBox="0 0 100 100">
                <circle
                  className={styles.progressBackground}
                  cx="50"
                  cy="50"
                  r="45"
                />
                <circle
                  className={styles.progressBar}
                  cx="50"
                  cy="50"
                  r="45"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 45}`,
                    strokeDashoffset: `${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`
                  }}
                />
              </svg>
            </div>
          </div>

          <div className={styles.controls}>
            {!isCompleted ? (
              <>
                {!isPlaying ? (
                  <button 
                    className={styles.startBtn}
                    onClick={startMeditation}
                  >
                    ▶️ Start Meditation
                  </button>
                ) : (
                  <button 
                    className={styles.pauseBtn}
                    onClick={pauseMeditation}
                  >
                    ⏸️ Pause
                  </button>
                )}
                <button 
                  className={styles.resetBtn}
                  onClick={resetMeditation}
                >
                  🔄 Reset
                </button>
              </>
            ) : (
              <button 
                className={styles.restartBtn}
                onClick={resetMeditation}
              >
                🎉 Start New Session
              </button>
            )}
          </div>
        </div>

        <div className={styles.meditationContent}>
          <div className={styles.breathingGuide}>
            <h3>🌬️ Breathing Guide</h3>
            <div className={styles.breathingCircle}>
              <div className={`${styles.breathIndicator} ${isPlaying ? styles.breathing : ''}`}>
                {isPlaying ? 'Breathe' : 'Ready'}
              </div>
            </div>
            <p className={styles.breathingText}>
              {isPlaying 
                ? "Breathe in slowly... and out gently. Focus on your breath."
                : "Click start to begin your peaceful meditation journey."
              }
            </p>
          </div>

          <div className={styles.ambientSounds}>
            <h3>🎵 Soothing Sounds</h3>
            <audio 
              ref={audioRef}
              src="/audio/soothing.mp3"
              loop
              preload="auto"
            />
            <p>Soft background music will play during your meditation</p>
          </div>
        </div>
      </div>

      {showReward && (
        <div className={styles.rewardModal}>
          <div className={styles.rewardContent}>
            <div className={styles.rewardIcon}>🎁</div>
            <h2>Reward Earned!</h2>
            <p>Congratulations! You completed your meditation session.</p>
            <p>You've earned a peaceful moment and inner calm. 🌟</p>
            <button 
              className={styles.closeRewardBtn}
              onClick={() => setShowReward(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div className={styles.tips}>
        <h3>💡 Meditation Tips</h3>
        <ul>
          <li>Find a quiet, comfortable place</li>
          <li>Sit or lie down in a relaxed position</li>
          <li>Focus on your breathing</li>
          <li>Let thoughts come and go naturally</li>
          <li>Be patient with yourself</li>
        </ul>
      </div>
    </div>
  )
}