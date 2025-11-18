import { useState, useEffect } from 'react';
import '../../styles/Games.css';

const MemoryGame = () => {
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards
    const duplicatedEmojis = [...emojis, ...emojis];
    // Shuffle the cards
    const shuffledCards = duplicatedEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false, solved: false }));
    
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setMoves(0);
    setGameOver(false);
  };

  // Handle card click
  const handleCardClick = (id) => {
    if (disabled) return;
    
    // Don't allow flipping a card that's already flipped or solved
    if (flipped.includes(id) || solved.includes(id)) return;
    
    // Add card to flipped array
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    
    // If this is the second card flipped
    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].emoji === cards[secondId].emoji) {
        // Cards match
        setSolved([...solved, firstId, secondId]);
        setFlipped([]);
        setDisabled(false);
      } else {
        // Cards don't match, flip them back
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  // Check if game is over
  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setGameOver(true);
    }
  }, [solved, cards]);

  return (
    <div className="game-container">
      <h2>Memory Game</h2>
      <div className="game-info">
        <div>Moves: {moves}</div>
        {gameOver && <div>Game Completed!</div>}
      </div>
      
      <div className="memory-board">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${(flipped.includes(card.id) || solved.includes(card.id)) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            {(flipped.includes(card.id) || solved.includes(card.id)) ? card.emoji : ''}
          </div>
        ))}
      </div>
      
      <button className="game-button" onClick={initializeGame}>
        {gameOver ? 'Play Again' : 'Reset Game'}
      </button>
    </div>
  );
};

export default MemoryGame;