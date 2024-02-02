import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { googleClientId } from './config';
import MainView from './components/MainView';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <UserProvider>
        <MainView />
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
