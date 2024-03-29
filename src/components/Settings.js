import React, { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { Dropdown, Form, Button, Col, Row, Badge, Container } from 'react-bootstrap';

const SettingsModal = ({ show, close }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const [settingsUnsaved, setSettingsUnsaved] = useState(settings);

  const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

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
            <Form id="settings">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="settings.dropdown-voice" className="mb-3">
                  <Form.Label>Voice</Form.Label>
                  <Dropdown value={settingsUnsaved.voice} onSelect={(voice) => setSettingsUnsaved({...settingsUnsaved, voice: voice})}>
                    <Dropdown.Toggle variant="success" id="dropdown-voice" size="sm">
                      {settingsUnsaved.voice.charAt(0).toUpperCase() + settingsUnsaved.voice.slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {voices.map((voice, index) => (
                        <Dropdown.Item key={index} eventKey={voice}>{voice.charAt(0).toUpperCase() + voice.slice(1)}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Speed</Form.Label>
                  <Container>
                    <Row>
                      <Col sm="auto"><Badge style={{width:'50px'}}>×{settingsUnsaved.speed}</Badge></Col>
                      <Col><Form.Range min={0.5} max={4} step={0.25} value={settingsUnsaved.speed} id="range-speed" onChange={(e) => setSettingsUnsaved({...settingsUnsaved, speed: e.target.value})} /></Col>
                    </Row>
                  </Container>
                </Form.Group>
              </Row>
              <Form.Group controlId="advancedModeCheckbox">
                <Form.Check 
                  type="switch"
                  label="Advanced Mode"
                  checked={settingsUnsaved.advancedMode}
                  onChange={e => setSettingsUnsaved({...settingsUnsaved, advancedMode: e.target.checked})}
                  id="advancedModeCheckbox"
                />
                <Form.Text id="advancedModeHelp">
                  Allows processing larger texts using streaming
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
          <div className="modal-footer">
            <Button onClick={close} variant="secondary">Cancel</Button>
            <Button onClick={saveSettings}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
