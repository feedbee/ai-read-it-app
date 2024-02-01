import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

import TextToSpeechApp from './components/TextToSpeechApp';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserProvider } from './context/UserContext';

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
    <GoogleOAuthProvider clientId="248458315070-5ik13f59uplr789f8otcrjkj5psqe9cp.apps.googleusercontent.com">
      <UserProvider>
        <div className="App">
          <Header settings={globalSettings} saveSettings={saveGlobalSettings} />
          <TextToSpeechApp settings={globalSettings} />
          <Footer />
        </div>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
