import { useState, useEffect } from 'react';
import '../../styles/Games.css';

const CatKiller = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [catPosition, setCatPosition] = useState({ top: 50, left: 50 });

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    let catMover;
    if (gameActive) {
      catMover = setInterval(() => {
        setCatPosition({
          top: Math.floor(Math.random() * 80),
          left: Math.floor(Math.random() * 80)
        });
      }, 1000);
    }
    return () => clearInterval(catMover);
  }, [gameActive]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setCatPosition({ top: 50, left: 50 });
  };

  const catchCat = () => {
    if (gameActive) {
      setScore(score + 1);
      setCatPosition({
        top: Math.floor(Math.random() * 80),
        left: Math.floor(Math.random() * 80)
      });
    }
  };

  return (
    <div className="game-container">
      <h2>Cat Killer</h2>
      <div className="game-info">
        <div>Score: {score}</div>
        <div>Time Left: {timeLeft}s</div>
      </div>
      
      {!gameActive && timeLeft === 30 ? (
        <div className="game-start">
          <p>Catch as many cats as you can in 30 seconds!</p>
          <button className="game-button" onClick={startGame}>Start Game</button>
        </div>
      ) : !gameActive && timeLeft === 0 ? (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>Your final score: {score}</p>
          <button className="game-button" onClick={startGame}>Play Again</button>
        </div>
      ) : (
        <div 
          className="cat-game-area"
          style={{ position: 'relative', height: '300px', border: '2px solid #ccc', borderRadius: '8px' }}
        >
          <div 
            className="cat"
            style={{
              position: 'absolute',
              top: `${catPosition.top}%`,
              left: `${catPosition.left}%`,
              cursor: 'pointer',
              fontSize: '40px',
              transition: 'all 0.1s ease'
            }}
            onClick={catchCat}
          >
            🐱
          </div>
        </div>
      )}
    </div>
  );
};

export default CatKiller;