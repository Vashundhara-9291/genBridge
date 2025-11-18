import { useState, useEffect, useRef } from 'react';
import '../../styles/Games.css';

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const gameAreaRef = useRef(null);

  // Game constants
  const GRID_SIZE = 20;
  const GAME_SPEED = 150;

  // Generate random food position
  const generateFood = () => {
    const x = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
    const y = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
    return { x, y };
  };

  // Check if position is occupied by snake
  const isPositionOccupied = (pos) => {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
  };

  // Start game
  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setGameActive(true);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, direction]);

  // Game loop
  useEffect(() => {
    if (!gameActive) return;

    const gameLoop = setInterval(() => {
      moveSnake();
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [snake, gameActive, direction]);

  // Move snake
  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    // Move head based on direction
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    // Check for collisions
    if (
      head.x < 0 || head.x >= GRID_SIZE ||
      head.y < 0 || head.y >= GRID_SIZE ||
      isPositionOccupied(head)
    ) {
      setGameActive(false);
      setGameOver(true);
      return;
    }

    // Add new head
    newSnake.unshift(head);

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      setFood(generateFood());
    } else {
      // Remove tail if no food was eaten
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  return (
    <div className="game-container">
      <h2>Snake Game</h2>
      <div className="game-info">
        <div>Score: {score}</div>
        {gameOver && <div>Game Over!</div>}
      </div>
      
      <div 
        className="snake-game-area"
        ref={gameAreaRef}
        tabIndex={0}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              left: `${(segment.x * 15)}px`,
              top: `${(segment.y * 15)}px`
            }}
          />
        ))}
        <div
          className="snake-food"
          style={{
            left: `${(food.x * 15)}px`,
            top: `${(food.y * 15)}px`
          }}
        />
      </div>
      
      <div className="game-controls">
        <p>Use arrow keys to control the snake</p>
        <button className="game-button" onClick={startGame}>
          {gameOver ? 'Play Again' : gameActive ? 'Restart' : 'Start Game'}
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;