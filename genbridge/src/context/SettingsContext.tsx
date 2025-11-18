import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CursorSettings {
  characterType: 'cat' | 'dog';
  size: number;
  learningMode: boolean;
}

interface SettingsContextType {
  settings: CursorSettings;
  updateSettings: (newSettings: Partial<CursorSettings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CursorSettings>({
    characterType: 'cat',
    size: 50,
    learningMode: false,
  });

  const updateSettings = (newSettings: Partial<CursorSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};