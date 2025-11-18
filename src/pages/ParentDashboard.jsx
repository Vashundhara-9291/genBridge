import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ParentDashboard.module.css'

export default function ParentDashboard() {
  const navigate = useNavigate()
  const [children, setChildren] = useState([])
  const [selectedChild, setSelectedChild] = useState(null)
  
  const handleLogout = () => {
    navigate('/')
  }
  const [newChild, setNewChild] = useState({ name: '', age: '', class: '', avatar: '🌱' })
  const [screenTime, setScreenTime] = useState(30)
  const [enableAI, setEnableAI] = useState(true)
  const [subjects, setSubjects] = useState({ English: true, Math: true, Science: true, Values: true })
  const [progress, setProgress] = useState({ vocab: 60, logic: 55, gk: 50 })
  const [rewards, setRewards] = useState([
    { id: 1, type: 'Avatar Accessory', name: 'Star Hat', status: 'pending', child: 'Aarav' },
    { id: 2, type: 'Pet', name: 'Baby Panda', status: 'pending', child: 'Aarav' },
    { id: 3, type: 'Story', name: 'The Wise Banyan', status: 'pending', child: 'Isha' }
  ])

  useEffect(() => {
    // Load children data
    fetch('/data/students.json')
      .then(r => r.json())
      .then(data => {
        setChildren(data)
        if (data.length > 0) {
          setSelectedChild(data[0])
        }
      })
      .catch(() => {
        // Fallback data
        const fallbackChildren = [
          { id: 1, name: 'Aarav', class: '2', progress: { vocab: 72, logic: 65, gk: 58 }, avatar: '🧒' },
          { id: 2, name: 'Isha', class: '3', progress: { vocab: 80, logic: 70, gk: 66 }, avatar: '👧' }
        ]
        setChildren(fallbackChildren)
        setSelectedChild(fallbackChildren[0])
      })
  }, [])

  useEffect(() => {
    if (selectedChild) {
      setProgress(selectedChild.progress || { vocab: 60, logic: 55, gk: 50 })
    }
  }, [selectedChild])

  const addChild = () => {
    if (!newChild.name.trim()) return
    
    const child = {
      id: Date.now(),
      ...newChild,
      progress: { vocab: 0, logic: 0, gk: 0 }
    }
    
    setChildren([...children, child])
    setNewChild({ name: '', age: '', class: '', avatar: '🌱' })
  }

  const toggleSubject = (key) => setSubjects(s => ({ ...s, [key]: !s[key] }))

  const approveReward = (rewardId) => {
    setRewards(rewards.map(r => 
      r.id === rewardId ? { ...r, status: 'approved' } : r
    ))
  }

  const rejectReward = (rewardId) => {
    setRewards(rewards.map(r => 
      r.id === rewardId ? { ...r, status: 'rejected' } : r
    ))
  }

  const getProgressColor = (value) => {
    if (value >= 80) return '#4CAF50'
    if (value >= 60) return '#FF9800'
    return '#F44336'
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>👨‍👩‍👧 Parent Dashboard</h1>
        <p className={styles.subtitle}>Manage your child's learning journey</p>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>

      <div className={styles.dashboard}>
        {/* Child Selection */}
        <div className={styles.childSection}>
          <div className={styles.childSelector}>
            <h3>👶 My Children</h3>
            <div className={styles.childList}>
              {children.map(child => (
                <div 
                  key={child.id}
                  className={`${styles.childCard} ${selectedChild?.id === child.id ? styles.selected : ''}`}
                  onClick={() => setSelectedChild(child)}
                >
                  <div className={styles.childAvatar}>{child.avatar}</div>
                  <div className={styles.childInfo}>
                    <h4>{child.name}</h4>
                    <p>Class {child.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.addChildCard}>
            <h3>➕ Add New Child</h3>
            <div className={styles.formGroup}>
              <input 
                placeholder="Child's Name"
                value={newChild.name}
                onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
              />
              <input 
                type="number"
                placeholder="Age"
                value={newChild.age}
                onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
              />
              <input 
                placeholder="Class"
                value={newChild.class}
                onChange={(e) => setNewChild({ ...newChild, class: e.target.value })}
              />
              <select 
                value={newChild.avatar}
                onChange={(e) => setNewChild({ ...newChild, avatar: e.target.value })}
              >
                <option value="🌱">🌱 Seedling</option>
                <option value="🧒">🧒 Child</option>
                <option value="👧">👧 Girl</option>
                <option value="👦">👦 Boy</option>
                <option value="🌟">🌟 Star</option>
                <option value="🦋">🦋 Butterfly</option>
              </select>
              <button className={styles.addBtn} onClick={addChild}>
                Add Child
              </button>
            </div>
          </div>
        </div>

        {/* Parental Controls */}
        <div className={styles.controlsSection}>
          <div className={styles.card}>
            <h3>⚙️ Parental Controls</h3>
            
            <div className={styles.controlGroup}>
              <label>📱 Daily Screen Time</label>
              <div className={styles.sliderContainer}>
                <input 
                  type="range" 
                  min="10" 
                  max="120" 
                  value={screenTime} 
                  onChange={(e) => setScreenTime(Number(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.sliderValue}>{screenTime} minutes</span>
              </div>
            </div>

            <div className={styles.controlGroup}>
              <label className={styles.toggleLabel}>
                <input 
                  type="checkbox" 
                  checked={enableAI} 
                  onChange={(e) => setEnableAI(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
                🤖 Enable AI Assistant
              </label>
            </div>

            <div className={styles.controlGroup}>
              <label>📚 Learning Subjects</label>
              <div className={styles.subjectChips}>
                {Object.keys(subjects).map((subject) => (
                  <label key={subject} className={styles.chip}>
                    <input 
                      type="checkbox" 
                      checked={subjects[subject]} 
                      onChange={() => toggleSubject(subject)} 
                    />
                    <span className={styles.chipText}>{subject}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        {selectedChild && (
          <div className={styles.progressSection}>
            <div className={styles.card}>
              <h3>📊 {selectedChild.name}'s Progress</h3>
              <div className={styles.progressGrid}>
                <ProgressBar 
                  label="Vocabulary" 
                  value={progress.vocab} 
                  color={getProgressColor(progress.vocab)}
                  icon="📖"
                />
                <ProgressBar 
                  label="Logic & Math" 
                  value={progress.logic} 
                  color={getProgressColor(progress.logic)}
                  icon="🧮"
                />
                <ProgressBar 
                  label="General Knowledge" 
                  value={progress.gk} 
                  color={getProgressColor(progress.gk)}
                  icon="🌍"
                />
              </div>
              
              <div className={styles.progressSummary}>
                <div className={styles.summaryCard}>
                  <h4>🎯 Overall Progress</h4>
                  <div className={styles.overallScore}>
                    {Math.round((progress.vocab + progress.logic + progress.gk) / 3)}%
                  </div>
                </div>
                <div className={styles.summaryCard}>
                  <h4>⭐ Learning Streak</h4>
                  <div className={styles.streakCount}>7 days</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rewards Management */}
        <div className={styles.rewardsSection}>
          <div className={styles.card}>
            <h3>🎁 Rewards Approval</h3>
            <div className={styles.rewardsList}>
              {rewards.map(reward => (
                <div key={reward.id} className={styles.rewardItem}>
                  <div className={styles.rewardInfo}>
                    <div className={styles.rewardType}>{reward.type}</div>
                    <div className={styles.rewardName}>{reward.name}</div>
                    <div className={styles.rewardChild}>Requested by: {reward.child}</div>
                  </div>
                  <div className={styles.rewardActions}>
                    {reward.status === 'pending' ? (
                      <>
                        <button 
                          className={styles.approveBtn}
                          onClick={() => approveReward(reward.id)}
                        >
                          ✅ Approve
                        </button>
                        <button 
                          className={styles.rejectBtn}
                          onClick={() => rejectReward(reward.id)}
                        >
                          ❌ Reject
                        </button>
                      </>
                    ) : (
                      <span className={`${styles.status} ${styles[reward.status]}`}>
                        {reward.status === 'approved' ? '✅ Approved' : '❌ Rejected'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ label, value, color, icon }) {
  return (
    <div className={styles.progressCard}>
      <div className={styles.progressHeader}>
        <span className={styles.progressIcon}>{icon}</span>
        <span className={styles.progressLabel}>{label}</span>
      </div>
      <div className={styles.progressTrack}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${value}%`, background: color }} 
        />
      </div>
      <div className={styles.progressValue}>{value}%</div>
    </div>
  )
}


