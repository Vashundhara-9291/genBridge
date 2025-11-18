import { useState, useEffect, useRef } from 'react';
import '../styles/AnimatedCursor.css';

const AnimatedCursor = ({ 
  character = 'cat', 
  size = 40, 
  learningMode = false,
  disabled = false,
  trailLength = 5,
  trailColor = 'rgba(255, 255, 255, 0.5)',
  clickEffect = true,
  hideOnTouch = true
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef(null);

  // Check if device is touch-enabled
  useEffect(() => {
    const checkTouch = () => {
      const isTouchEnabled = 'ontouchstart' in window || 
                            navigator.maxTouchPoints > 0 || 
                            navigator.msMaxTouchPoints > 0 ||
                            (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      setIsTouchDevice(isTouchEnabled);
      
      // Add or remove the cursor-hidden class on the body
      if (!isTouchEnabled && !disabled) {
        document.body.classList.add('cursor-hidden');
      } else {
        document.body.classList.remove('cursor-hidden');
      }
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => {
      window.removeEventListener('resize', checkTouch);
      document.body.classList.remove('cursor-hidden');
    };
  }, [disabled]);

  // Skip rendering on touch devices if hideOnTouch is true
  if ((isTouchDevice && hideOnTouch) || disabled) return null;

  // Mouse movement handler
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update trail positions
      setTrailPositions(prev => {
        const newPositions = [...prev, { x: e.clientX, y: e.clientY }];
        if (newPositions.length > trailLength) {
          return newPositions.slice(newPositions.length - trailLength);
        }
        return newPositions;
      });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  // Click animation handler
  useEffect(() => {
    const handleClick = () => {
      if (clickEffect) {
        setClicked(true);
        setTimeout(() => setClicked(false), 300);
      }
    };

    if (clickEffect) {
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [clickEffect]);

  // Context-aware cursor changes
  useEffect(() => {
    const handleHover = (e) => {
      const target = e.target;
      
      // Check for different zones
      if (target.classList.contains('learning-zone')) {
        setCursorType('magnify');
      } else if (target.classList.contains('game-zone')) {
        setCursorType('ball');
      } else if (target.classList.contains('story-zone')) {
        setCursorType('book');
      } else {
        setCursorType('default');
      }
    };

    document.addEventListener('mouseover', handleHover);
    return () => document.removeEventListener('mouseover', handleHover);
  }, []);

  // Character selection
  const getCharacter = () => {
    switch (character) {
      case 'cat':
        return '🐱';
      case 'dog':
        return '🐶';
      case 'rabbit':
        return '🐰';
      case 'fox':
        return '🦊';
      default:
        return '🐱';
    }
  };

  // Context-aware cursor icon
  const getCursorIcon = () => {
    switch (cursorType) {
      case 'magnify':
        return '🔍';
      case 'ball':
        return '⚽';
      case 'book':
        return '📚';
      default:
        return getCharacter();
    }
  };

  return (
    <>
      {/* Main cursor */}
      <div 
        className={`animated-cursor ${clicked ? 'clicked' : ''} ${cursorType}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size}px`,
          height: `${size}px`,
        }}
        ref={cursorRef}
      >
        <div className="cursor-character">{getCursorIcon()}</div>
        {character === 'cat' && (
          <>
            <div className="cat-ear left-ear"></div>
            <div className="cat-ear right-ear"></div>
            <div className="cat-tail"></div>
          </>
        )}
        {character === 'dog' && (
          <>
            <div className="dog-ear left-ear"></div>
            <div className="dog-ear right-ear"></div>
            <div className="dog-tail"></div>
          </>
        )}
      </div>

      {/* Trailing elements */}
      {trailPositions.map((pos, index) => (
        <div 
          key={index}
          className="cursor-trail"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: `${size * (0.5 - index * 0.08)}px`,
            height: `${size * (0.5 - index * 0.08)}px`,
            opacity: 1 - (index / trailLength),
            backgroundColor: trailColor,
          }}
        />
      ))}
    </>
  );
};

export default AnimatedCursor;