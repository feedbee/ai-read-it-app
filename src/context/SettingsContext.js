import React, { createContext, useState, useEffect, useContext } from 'react';

export const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

const normalizeSettings = (settings) => {
  const defaults = {
    v: 1, advancedMode: false, voice: 'echo', speed: 1
  };
  if (!settings) {
    return defaults;
  }
  for (const key in defaults) {
    if (!settings.hasOwnProperty(key)) {
      settings[key] = defaults[key];
    }
  }
  return settings;
};

const loadSettings = () => {
  let settings;

  const settingsStorage = localStorage.getItem('settings');
  if (settingsStorage) {
    try {
      settings = JSON.parse(settingsStorage);
    } catch (error) {
      // handled below by normalizeSettings()
    }
  }

  if (!settings) {
    console.info("Settings not found or can't be parsed, using defaults");
  }
  settings = normalizeSettings(settings);
  console.info("Settings loaded: ", normalizeSettings(settings))
  return settings;
};

const saveSettings = (settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
  console.info("Settings saved: ", settings);
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    // Update localStorage when settings changes
    saveSettings(settings);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
