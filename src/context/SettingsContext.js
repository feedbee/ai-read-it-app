import React, { createContext, useState, useEffect, useContext } from 'react';

export const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('settings')) || { advancedMode: false });
  console.info("Settings loaded: ", settings);

  useEffect(() => {
    // Update localStorage when settings changes
    localStorage.setItem('settings', JSON.stringify(settings));
    console.info("Settings saved: ", settings);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
