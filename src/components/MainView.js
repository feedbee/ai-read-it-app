import React, { useState } from 'react';

import TextToSpeechApp from './TextToSpeechApp';
import MainPage from '../pages/MainPage';
import Header from './Header';
import Footer from './Footer';
import { useUser } from '../context/UserContext';

import { userMode } from '../config';

const MainView = () => {
    
    const { user } = useUser();
  
    return (
        <div className="App">
            <Header />
            {userMode === 'required' && !user ? <MainPage /> : <TextToSpeechApp /> }
            <Footer />
        </div>
    );
  };
  
  export default MainView;
