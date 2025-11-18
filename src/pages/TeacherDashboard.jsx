import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './TeacherDashboard.module.css'

export default function TeacherDashboard() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [task, setTask] = useState('')
  const [assigned, setAssigned] = useState([])
  const [feedback, setFeedback] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  
  const handleLogout = () => {
    navigate('/')
  }

  useEffect(() => {
    fetch('/data/students.json')
      .then(r => r.json())
      .then(data => {
        setStudents(data)
        if (data.length > 0) {
          setSelectedStudent(data[0])
        }
      })
      .catch(() => {
        // Fallback data
        const fallbackStudents = [
          { id: 1, name: 'Aarav', class: '2', progress: { vocab: 72, logic: 65, gk: 58 }, avatar: '🧒' },
          { id: 2, name: 'Isha', class: '3', progress: { vocab: 80, logic: 70, gk: 66 }, avatar: '👧' },
          { id: 3, name: 'Rohan', class: '1', progress: { vocab: 65, logic: 58, gk: 62 }, avatar: '👦' },
          { id: 4, name: 'Priya', class: '2', progress: { vocab: 85, logic: 75, gk: 70 }, avatar: '👧' }
        ]
        setStudents(fallbackStudents)
        setSelectedStudent(fallbackStudents[0])
      })
  }, [])

  const assign = () => {
    if (!task.trim()) return
    const newTask = {
      id: Date.now(),
      task: task,
      assignedDate: new Date().toLocaleDateString(),
      status: 'assigned'
    }
    setAssigned(a => [...a, newTask])
    setTask('')
  }

  const sendFeedback = () => {
    if (!feedback.trim() || !selectedStudent) return
    alert(`Feedback sent to ${selectedStudent.name}'s parents!`)
    setFeedback('')
  }

  const getProgressColor = (value) => {
    if (value >= 80) return '#4CAF50'
    if (value >= 60) return '#FF9800'
    return '#F44336'
  }

  const getOverallProgress = (student) => {
    return Math.round((student.progress.vocab + student.progress.logic + student.progress.gk) / 3)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>👩‍🏫 Teacher Dashboard</h1>
        <p className={styles.subtitle}>Manage your students and track their learning progress</p>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      <div className={styles.dashboard}>
        {/* Student Management */}
        <div className={styles.studentSection}>
          <div className={styles.card}>
            <h3>👥 My Students</h3>
            <div className={styles.studentList}>
              {students.map(student => (
                <div 
                  key={student.id}
                  className={`${styles.studentCard} ${selectedStudent?.id === student.id ? styles.selected : ''}`}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className={styles.studentAvatar}>{student.avatar}</div>
                  <div className={styles.studentInfo}>
                    <h4>{student.name}</h4>
                    <p>Class {student.class}</p>
                    <div className={styles.overallProgress}>
                      <span>Overall: {getOverallProgress(student)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Assignment */}
        <div className={styles.taskSection}>
          <div className={styles.card}>
            <h3>📝 Assign Syllabus Task</h3>
            <div className={styles.taskForm}>
              <input 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="e.g., EVS: Plants worksheet, Math: Addition problems"
                className={styles.taskInput}
              />
              <button className={styles.assignBtn} onClick={assign}>
                📋 Assign Task
              </button>
            </div>
            
            <div className={styles.assignedTasks}>
              <h4>📚 Assigned Tasks</h4>
              <div className={styles.taskList}>
                {assigned.map((task) => (
                  <div key={task.id} className={styles.taskItem}>
                    <div className={styles.taskContent}>
                      <span className={styles.taskText}>{task.task}</span>
                      <span className={styles.taskDate}>{task.assignedDate}</span>
                    </div>
                    <span className={styles.taskStatus}>{task.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Analytics */}
        <div className={styles.analyticsSection}>
          <div className={styles.card}>
            <h3>📊 Progress Analytics</h3>
            <div className={styles.analyticsGrid}>
              {students.map(student => (
                <div key={student.id} className={styles.analyticsCard}>
                  <div className={styles.analyticsHeader}>
                    <div className={styles.analyticsAvatar}>{student.avatar}</div>
                    <div className={styles.analyticsInfo}>
                      <h4>{student.name}</h4>
                      <p>Class {student.class}</p>
                    </div>
                    <div className={styles.analyticsScore}>
                      {getOverallProgress(student)}%
                    </div>
                  </div>
                  
                  <div className={styles.progressBars}>
                    <ProgressBar 
                      label="Vocabulary" 
                      value={student.progress.vocab} 
                      color={getProgressColor(student.progress.vocab)}
                      icon="📖"
                    />
                    <ProgressBar 
                      label="Logic & Math" 
                      value={student.progress.logic} 
                      color={getProgressColor(student.progress.logic)}
                      icon="🧮"
                    />
                    <ProgressBar 
                      label="General Knowledge" 
                      value={student.progress.gk} 
                      color={getProgressColor(student.progress.gk)}
                      icon="🌍"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Communication */}
        <div className={styles.communicationSection}>
          <div className={styles.card}>
            <h3>💬 Parent Communication</h3>
            <div className={styles.communicationForm}>
              <div className={styles.studentSelector}>
                <label>Select Student:</label>
                <select 
                  value={selectedStudent?.id || ''} 
                  onChange={(e) => {
                    const student = students.find(s => s.id === parseInt(e.target.value))
                    setSelectedStudent(student)
                  }}
                  className={styles.studentSelect}
                >
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} (Class {student.class})
                    </option>
                  ))}
                </select>
              </div>
              
              <textarea 
                className={styles.feedbackTextarea} 
                placeholder="Write feedback for parents about their child's progress..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              
              <button 
                className={styles.sendFeedbackBtn} 
                onClick={sendFeedback}
                disabled={!feedback.trim() || !selectedStudent}
              >
                📤 Send Feedback
              </button>
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


