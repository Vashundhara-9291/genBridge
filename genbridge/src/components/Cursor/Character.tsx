import React, { useEffect, useRef } from 'react';

interface CharacterProps {
  type: 'cat' | 'dog';
  size: number;
  isHovering: boolean;
}

const Character: React.FC<CharacterProps> = ({ type, size, isHovering }) => {
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (characterRef.current) {
      characterRef.current.style.width = `${size}px`;
      characterRef.current.style.height = `${size}px`;
    }
  }, [size]);

  return (
    <div
      ref={characterRef}
      className={`character ${type} ${isHovering ? 'hover' : ''}`}
      style={{
        transition: 'transform 0.2s ease',
        position: 'absolute',
        pointerEvents: 'none',
      }}
    >
      {type === 'cat' ? '🐱' : '🐶'}
    </div>
  );
};

export default Character;