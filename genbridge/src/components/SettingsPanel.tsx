import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useContext(SettingsContext);

  const handleCharacterTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ characterType: event.target.value });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ size: Number(event.target.value) });
  };

  const handleLearningModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ learningMode: event.target.checked });
  };

  return (
    <div className="settings-panel">
      <h2>Cursor Settings</h2>
      <div>
        <label htmlFor="character-type">Character Type:</label>
        <select
          id="character-type"
          value={settings.characterType}
          onChange={handleCharacterTypeChange}
        >
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
        </select>
      </div>
      <div>
        <label htmlFor="size">Size:</label>
        <input
          type="number"
          id="size"
          value={settings.size}
          onChange={handleSizeChange}
          min="10"
          max="100"
        />
      </div>
      <div>
        <label htmlFor="learning-mode">Learning Mode:</label>
        <input
          type="checkbox"
          id="learning-mode"
          checked={settings.learningMode}
          onChange={handleLearningModeChange}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;