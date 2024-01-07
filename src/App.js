import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';

import TextToSpeechApp from './components/TextToSpeechApp';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [globalSettings, setGlobalSettings] = useState(() => {
    // Retrieve the initial value from local storage or default to an object
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : { advancedMode: false };
  });
  const saveGlobalSettings = (newSettings) => {
    localStorage.setItem('settings', JSON.stringify(newSettings));
    setGlobalSettings(newSettings);
  };

  return (
    <div className="App">
      <Header settings={globalSettings} saveSettings={saveGlobalSettings} />
      <TextToSpeechApp settings={globalSettings} />
      <Footer />
    </div>
  );
}

export default App;
