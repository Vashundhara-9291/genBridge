import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import ChildLogin from './pages/ChildLogin.jsx'
import ParentLogin from './pages/ParentLogin.jsx'
import TeacherLogin from './pages/TeacherLogin.jsx'
import ParentDashboard from './pages/ParentDashboard.jsx'
import ChildDashboard from './pages/ChildDashboard.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import ElderPortal from './pages/ElderPortal.jsx'
import Meditation from './pages/Meditation.jsx'
import CursorDemo from './pages/CursorDemo.jsx'
import AnimatedCursor from './components/AnimatedCursor.jsx'

function App() {
  // cursor preferences (persisted)
  const [cursorCharacter, setCursorCharacter] = useState(() => {
    try {
      return localStorage.getItem('cursorCharacter') || 'cat'
    } catch (e) {
      return 'cat'
    }
  })

  const [cursorEnabled, setCursorEnabled] = useState(() => {
    try {
      const v = localStorage.getItem('cursorEnabled')
      return v == null ? true : v === 'true'
    } catch (e) {
      return true
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cursorCharacter', cursorCharacter)
    } catch (e) {}
  }, [cursorCharacter])

  useEffect(() => {
    try {
      localStorage.setItem('cursorEnabled', String(cursorEnabled))
    } catch (e) {}
  }, [cursorEnabled])

  return (
    <div className="app-root">
      {/* <AnimatedCursor 
        character={cursorCharacter} 
        disabled={!cursorEnabled}
        size={40}
        learningMode={false}
        trailLength={5}
        trailColor="rgba(255, 200, 200, 0.5)"
        clickEffect={true}
      /> */}
      <Navbar
        cursorCharacter={cursorCharacter}
        setCursorCharacter={setCursorCharacter}
        cursorEnabled={cursorEnabled}
        setCursorEnabled={setCursorEnabled}
      />
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/childLogin" element={<ChildLogin />} />
          <Route path="/parentLogin" element={<ParentLogin />} />
          <Route path="/teacherLogin" element={<TeacherLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/child" element={<ChildDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/elder" element={<ElderPortal />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/cursor-demo" element={<CursorDemo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
