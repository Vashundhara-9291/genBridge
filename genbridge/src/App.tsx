import React from 'react';
import AnimatedCursor from './components/Cursor/AnimatedCursor';
import SettingsPanel from './components/SettingsPanel';
import './styles/globals.css';

const App = () => {
  return (
    <div>
      <SettingsPanel />
      <AnimatedCursor />
    </div>
  );
};

export default App;