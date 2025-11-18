import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClassVideos from '../components/ClassVideos.jsx'
import TicTacToe from '../components/games/TicTacToe.jsx'
import CatKiller from '../components/games/CatKiller.jsx'
import MemoryGame from '../components/games/MemoryGame.jsx'
import SnakeGame from '../components/games/SnakeGame.jsx'
import styles from './ChildDashboard.module.css'

export default function ChildDashboard() {
  const [dailyWord, setDailyWord] = useState(null)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [showClassVideos, setShowClassVideos] = useState(null)
  const [showClassOptions, setShowClassOptions] = useState(false)
  const [showGameVideos, setShowGameVideos] = useState(false)
  const [showMoralStories, setShowMoralStories] = useState(false)
  const [currentActivity, setCurrentActivity] = useState('home')
  const [gameVideos, setGameVideos] = useState([])
  const [moralStories, setMoralStories] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/data/dailyWord.json')
      .then((r) => r.json())
      .then(setDailyWord)
      .catch(() => setDailyWord(null))

    fetch('/data/game_videos.json')
      .then((r) => r.json())
      .then(setGameVideos)
      .catch(() => setGameVideos([]))

    fetch('/data/moral_stories.json')
      .then((r) => r.json())
      .then(setMoralStories)
      .catch(() => setMoralStories([]))
  }, [])

  const speak = () => {
    if (!dailyWord) return
    const utter = new SpeechSynthesisUtterance(`${dailyWord.word}. ${dailyWord.meaning}`)
    speechSynthesis.speak(utter)
  }

  const send = () => {
    if (!message.trim()) return
    setChat((c) => [...c, { role: 'child', text: message }, { role: 'ai', text: 'This is a placeholder AI response.' }])
    setMessage('')
  }

  const openClassVideos = (classType) => setShowClassVideos(classType)
  const closeClassVideos = () => setShowClassVideos(null)
  
  const handleLogout = () => {
    navigate('/');
  }
  
  const selectGame = (game) => {
    setSelectedGame(game);
    setCurrentActivity('games');
  }

  const renderHomeView = () => (
    <div className={styles.grid}>
      {/* Learning Card */}
      <div className={`${styles.card} learning-element`}>
        <h3>📚 Let's Study and Enjoy</h3>
        <p>Choose your class to start learning!</p>

        {!showClassOptions ? (
          <div style={{ display: 'flex', gap: 12 }}>
            <button className={styles.exploreBtn} onClick={() => setShowClassOptions(true)}>
              📚 Let's Study and Enjoy
            </button>
          </div>
        ) : (
          <div className={styles.classButtons}>
            <button className={styles.classBtn} onClick={() => openClassVideos('nursery')}>
              🧒 Nursery Class
            </button>
            <button className={styles.classBtn} onClick={() => openClassVideos('class1')}>
              👧 Class 1st
            </button>
            <button className={styles.backBtn} onClick={() => setShowClassOptions(false)}>
              ← Hide
            </button>
          </div>
        )}
      </div>

      {/* Game Zone */}
      <div className={`${styles.card} game-element`}>
        <h3>🏀 Game Zone</h3>
        <p>Fun games to learn while playing!</p>

        {!showGameVideos ? (
          <button className={styles.exploreBtn} onClick={() => setShowGameVideos(true)}>
            🎮 Explore Games
          </button>
        ) : (
          <div className={styles.videoGrid}>
            <button className={styles.backBtn} onClick={() => setShowGameVideos(false)}>
              ← Back
            </button>
            <h4>Interactive Learning Games</h4>
            <div className={styles.videoList}>
              {gameVideos.slice(0, 10).map((game) => (
                <div key={game.id} className={styles.videoItem}>
                  <div className={styles.videoThumbnail}>
                    <div className={styles.playIcon}>▶️</div>
                    <div className={styles.duration}>{game.duration}</div>
                  </div>
                  <div className={styles.videoDetails}>
                    <h5>{game.title}</h5>
                    <p>{game.description}</p>
                    <span className={styles.category}>{game.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Moral Stories */}
      <div className={`${styles.card} story-element`}>
        <h3>🌟 Moral Stories</h3>
        <p>Beautiful stories with important lessons!</p>

        {!showMoralStories ? (
          <button className={styles.exploreBtn} onClick={() => setShowMoralStories(true)}>
            📖 Read Stories
          </button>
        ) : (
          <div className={styles.videoGrid}>
            <button className={styles.backBtn} onClick={() => setShowMoralStories(false)}>
              ← Back
            </button>
            <h4>Moral Stories Collection</h4>
            <div className={styles.videoList}>
              {moralStories.slice(0, 5).map((story) => (
                <div key={story.id} className={styles.videoItem}>
                  <div className={styles.videoThumbnail}>
                    <div className={styles.playIcon}>▶️</div>
                    <div className={styles.duration}>{story.duration}</div>
                  </div>
                  <div className={styles.videoDetails}>
                    <h5>{story.title}</h5>
                    <p>{story.description}</p>
                    <div className={styles.moral}>💡 {story.moral}</div>
                    <div className={styles.tags}>
                      {story.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderLearningView = () => (
    <div className={styles.learningView}>
      <button className={styles.backBtn} onClick={() => setCurrentActivity('home')}>
        ← Back to Activities
      </button>

      <div className={styles.learningContent}>
        <h2>🎓 Learning Center</h2>
        <p>Choose what you want to learn today!</p>
        <div className={styles.learningOptions}>
      
          <button className={styles.learningBtn} onClick={() => openClassVideos('nursery')}>
            <span className={styles.btnIcon}>🧒</span>
            <span>Nursery Videos</span>
          </button>
          <button className={styles.learningBtn} onClick={() => openClassVideos('class1')}>
            <span className={styles.btnIcon}>👧</span>
            <span>Class 1 Videos</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderGamesView = () => {
    if (selectedGame) {
      switch (selectedGame) {
        case 'tictactoe':
          return <TicTacToe />;
        case 'catkiller':
          return <CatKiller />;
        case 'memory':
          return <MemoryGame />;
        case 'snake':
          return <SnakeGame />;
        default:
          return null;
      }
    }
    
    return (
      <div className={styles.gamesGrid}>
        <div className={styles.gameCard} onClick={() => selectGame('tictactoe')}>
          <h3>Tic Tac Toe</h3>
          <p>Classic game of X's and O's</p>
        </div>
        <div className={styles.gameCard} onClick={() => selectGame('catkiller')}>
          <h3>Cat Killer</h3>
          <p>Catch as many cats as you can!</p>
        </div>
        <div className={styles.gameCard} onClick={() => selectGame('memory')}>
          <h3>Memory Game</h3>
          <p>Test your memory with matching pairs</p>
        </div>
        <div className={styles.gameCard} onClick={() => selectGame('snake')}>
          <h3>Snake Game</h3>
          <p>Control the snake and eat food</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrap} >
      <div className={styles.sidebar} >
        <div
          className={`${styles.sidebarItem} ${currentActivity === 'home' ? styles.active : ''}`}
          onClick={() => setCurrentActivity('home')}
        >
          Home
        </div>
        <div
          className={`${styles.sidebarItem} ${currentActivity === 'classes' ? styles.active : ''}`}
          onClick={() => {
            setCurrentActivity('classes')
            setShowClassOptions(true)
            setShowGameVideos(false)
            setShowMoralStories(false)
            setSelectedGame(null)
          }}
        >
          Classes
        </div>
        <div
          className={`${styles.sidebarItem} ${currentActivity === 'games' ? styles.active : ''}`}
          onClick={() => {
            setCurrentActivity('games')
            setShowClassOptions(false)
            setShowGameVideos(false)
            setShowMoralStories(false)
            setSelectedGame(null)
          }}
        >
          Games
        </div>
        <div
          className={`${styles.sidebarItem} ${currentActivity === 'stories' ? styles.active : ''}`}
          onClick={() => {
            setCurrentActivity('stories')
            setShowClassOptions(false)
            setShowGameVideos(false)
            setShowMoralStories(true)
            setSelectedGame(null)
          }}
        >
          Stories
        </div>
        <div
          className={`${styles.sidebarItem} ${styles.logoutButton}`}
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>

      <div className={styles.dailyWordSection}>
        <div className={styles.dailyWordCard}>
          <h3>📖 Daily Word</h3>
          {dailyWord && (
            <div className={styles.wordContent}>
              <div className={styles.word}>{dailyWord.word}</div>
              <div className={styles.meaning}>{dailyWord.meaning}</div>
              <button className={styles.audioBtn} onClick={speak}>
                🔊 Play Audio
              </button>
            </div>
          )}
        </div>
      </div>

      {currentActivity === 'home' ? renderHomeView() : 
       currentActivity === 'games' ? renderGamesView() : 
       renderLearningView()}

      {/* AI Assistant Section */}
      <div className={styles.aiSection}>
        <div className={styles.card}>
          <h3>🤖 AI Assistant</h3>
          <div className={styles.chatBox}>
            {chat.map((m, i) => (
              <div key={i} className={m.role === 'child' ? styles.msgChild : styles.msgAI}>
                {m.text}
              </div>
            ))}
          </div>
          <div className={styles.chatInput}>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask me anything..." />
            <button onClick={send} className={styles.sendBtn}>Send</button>
          </div>
        </div>
      </div>

      {/* Class Videos Modal */}
      {showClassVideos && (
        <ClassVideos classType={showClassVideos} onClose={closeClassVideos} />
      )}
    </div>
  )
}



