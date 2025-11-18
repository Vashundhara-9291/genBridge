import React from 'react';
import '../styles/CursorDemo.css';

const CursorDemo = () => {
  return (
    <div className="cursor-demo-container">
      <h1>Animated Cursor Demo</h1>
      <p>Move your cursor around to see the animated character follow your mouse!</p>
      
      <div className="demo-zones">
        <div className="zone learning-zone">
          <h2>Learning Zone</h2>
          <p>Hover here to see the magnifying glass cursor</p>
          <div className="zone-content">
            <span className="zone-icon">🔍</span>
            <p>This area is for learning and discovery</p>
          </div>
        </div>
        
        <div className="zone game-zone">
          <h2>Game Zone</h2>
          <p>Hover here to see the soccer ball cursor</p>
          <div className="zone-content">
            <span className="zone-icon">⚽</span>
            <p>This area is for games and fun activities</p>
          </div>
        </div>
        
        <div className="zone story-zone">
          <h2>Story Zone</h2>
          <p>Hover here to see the book cursor</p>
          <div className="zone-content">
            <span className="zone-icon">📚</span>
            <p>This area is for stories and reading</p>
          </div>
        </div>
      </div>
      
      <div className="cursor-controls">
        <h2>Cursor Controls</h2>
        <p>Try clicking anywhere to see the click animation effect!</p>
      </div>
      
      <div className="demo-instructions">
        <h3>How It Works</h3>
        <ul>
          <li>The cursor follows your mouse with a smooth trailing effect</li>
          <li>It changes appearance based on what you hover over</li>
          <li>Click anywhere to see the animation effect</li>
          <li>The cursor is automatically disabled on touch devices</li>
        </ul>
      </div>
    </div>
  );
};

export default CursorDemo;