import React, { useState, useEffect } from 'react';

const SettingsModal = ({ show, close, globalSettings, saveGlobalSettings }) => {

  const [settings, setSettings] = useState(() => {
    return globalSettings;
  });

  // Reset temp options whenever the modal is opened
  useEffect(() => {
    setSettings(globalSettings);
  }, [show, globalSettings]);

  // Bind to Esc button
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    // Add event listener for the Escape key
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  const saveSettings = () => {
    saveGlobalSettings(settings);
    close();
  };

  return (
    <div className={`modal ${show ? 'd-block' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', textAlign: 'left' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Settings</h5>
            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={close}></button>
          </div>
          <div className="modal-body">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={settings.advancedMode} 
                onChange={e => setSettings({...settings, advancedMode: e.target.checked})}
                id="advancedModeCheckbox" />
              <label className="form-check-label" htmlFor="advancedModeCheckbox">
                Advanced Mode
              </label>
              <div id="advancedModeHelp" className="form-text">Allows processing larger texts using streaming</div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={close}>Close</button>
            <button type="button" className="btn btn-primary" onClick={saveSettings}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
