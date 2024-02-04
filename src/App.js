import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { googleClientId } from './config';
import MainView from './components/MainView';
import { UserProvider } from './context/UserContext';
import { SettingsProvider } from './context/SettingsContext';
import { CreditsProvider} from './context/CreditsContext';

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <UserProvider>
        <CreditsProvider>
          <SettingsProvider>
            <MainView />
          </SettingsProvider>
        </CreditsProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
