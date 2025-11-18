import React, { useEffect, useRef } from 'react';
import './cursor.css';

interface AnimatedCursorProps {
  characterType: 'cat' | 'dog';
  size: number;
  learningMode: boolean;
}

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({ characterType, size, learningMode }) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mousePosition.current.x}px, ${mousePosition.current.y}px)`;
      }
    };

    const interval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mousePosition.current.x}px, ${mousePosition.current.y}px)`;
      }
    }, 16);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`animated-cursor ${characterType}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        position: 'absolute',
        pointerEvents: 'none',
        transition: learningMode ? 'transform 0.1s ease' : 'none',
      }}
    >
      {/* Character representation can be added here */}
    </div>
  );
};

export default AnimatedCursor;