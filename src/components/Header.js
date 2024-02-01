import React, { useState } from 'react';
import logo from '../ai-read-it-logo.svg';

import SettingsModal from './Settings';
import UserLogin from './UserLogin';

const Header = ({settings, saveSettings}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <header className="header bg-light py-3">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src={logo} alt="AI, Read It! Logo" className="logo" style={{ maxWidth: '40px', height: 'auto', marginRight: '.7em', marginBottom: '.4em' }} />
          <h1 className="ml-3">AI, Read It!</h1>
        </div>
        <div className="right-side-buttons d-flex align-items-center">
          <button className="btn" onClick={() => setShowSettingsModal(true)}>
            <i className="bi bi-gear-fill"></i>
          </button>
          <UserLogin></UserLogin>
        </div>
      </div>
      <SettingsModal 
        show={showSettingsModal}
        close={() => setShowSettingsModal(false)}
        globalSettings={settings}
        saveGlobalSettings={saveSettings}
      />
    </header>
  );
};

export default Header;
