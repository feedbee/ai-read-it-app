import React, { useState } from 'react';

import TextToSpeechApp from './TextToSpeechApp';
import MainPage from '../pages/MainPage';
import Header from './Header';
import Footer from './Footer';
import { useUser } from '../context/UserContext';

import { userMode } from '../config';

const MainView = () => {
    const [globalSettings, setGlobalSettings] = useState(() => {
      // Retrieve the initial value from local storage or default to an object
      const savedSettings = localStorage.getItem('settings');
      return savedSettings ? JSON.parse(savedSettings) : { advancedMode: false };
    });
    const saveGlobalSettings = (newSettings) => {
      localStorage.setItem('settings', JSON.stringify(newSettings));
      setGlobalSettings(newSettings);
    };
    const { user } = useUser();
    console.log("App: ", user);
  
    return (
        <div className="App">
            <Header settings={globalSettings} saveSettings={saveGlobalSettings} />
            {userMode === 'required' && !user ? <MainPage /> : <TextToSpeechApp settings={globalSettings} /> }
            <Footer />
        </div>
    );
  };
  
  export default MainView;
