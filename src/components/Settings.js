import React, { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const SettingsModal = ({ show, close }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const [settingsUnsaved, setSettingsUnsaved] = useState(settings);

  // Reset temp options whenever the modal is opened
  useEffect(() => {
    setSettingsUnsaved(settings);
  }, [show, settings, setSettingsUnsaved]);

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
    setSettings(settingsUnsaved);
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
                checked={settingsUnsaved.advancedMode} 
                onChange={e => setSettingsUnsaved({...settingsUnsaved, advancedMode: e.target.checked})}
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
