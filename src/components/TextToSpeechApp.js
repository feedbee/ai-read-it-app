import React, { useState, useRef } from 'react';
import { characterLimit, characterLimitLargeText, backendBaseUrl } from '../config';
import apiService, { getAuthHeader } from '../api/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSettings } from '../context/SettingsContext';

const TextToSpeechApp = () => {
  const { settings } = useSettings();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState(''); // simple mode
  const audioRef = useRef(null); // advanced mode

  const isAdvMode = settings.advancedMode;

  const isTextTooShort = text.length < 3;
  const applicableCharacterLimit = isAdvMode ? characterLimitLargeText : characterLimit;
  const isCloseToLimit = text.length > applicableCharacterLimit * 0.9 && text.length <= applicableCharacterLimit;
  const isOverLimit = text.length > applicableCharacterLimit;

  const sendSmallText = async () => {
    try {
      const response = await apiService.post(`/tts/small`, { text }, {
        responseType: 'blob', // Important for handling binary data like audio
      });
  
      // Assuming successful response, create a URL for the audio blob
      const newAudioUrl = URL.createObjectURL(response.data);
      setAudioUrl(newAudioUrl); // Update state or handle the audio URL as needed

    } catch (error) {
      let errorMsg = 'Server request error'; // Default error message
      if (error.message) {
        errorMsg += ': ' + error.message;
      }
      if (error.response && error.response.data) {
        try {
          // Attempt to parse error response if it's JSON
          let errorData = error.response.data;
          if (typeof error.response.data === 'string') {
            errorData = JSON.parse(error.response.data);
          } else if (error.response.data instanceof Blob) {
            errorData = JSON.parse(await error.response.data.text());
          }
          errorMsg = errorData.error || errorMsg;
        } catch (jsonError) {
          // If parsing fails, default message is already set
        }
      }
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const sendLargeText = async () => {
    if (!window.MediaSource) {
      setError('MediaSource Extensions are not supported in your browser.');
      setLoading(false);
      return;
    }
  
    const mediaSource = new MediaSource();
    const audioUrl = URL.createObjectURL(mediaSource);
    audioRef.current.src = audioUrl;

    mediaSource.addEventListener('sourceopen', async () => {
      try {
        const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');

        let headers = { 'Content-Type': 'application/json' };
        let authHeader = getAuthHeader();
        if (authHeader) {
          Object.assign(headers, authHeader);
        }
        const response = await fetch(`${backendBaseUrl}/tts/large`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ text, voice: settings.voice }),
        });

        if (!response.ok) {
          throw Error(`Request failed: ${response.status} ${response.statusText}`);
        }

        const reader = response.body.getReader();

        const processChunk = ({ done, value }) => {
          if (done) {
            mediaSource.endOfStream();
            setLoading(false);
            return;
          }
          if (!sourceBuffer.updating) {
            sourceBuffer.appendBuffer(value);
          } else {
            setTimeout(() => processChunk({ done, value }), 100); // Retry after a delay
          }
        };

        sourceBuffer.addEventListener('updateend', () => {
          reader.read().then(processChunk);
        });

        reader.read().then(processChunk);
      } catch (err) {
        console.log(err);
        setError('Error fetching audio stream');
        setLoading(false);
      }
    });
  };

  const processText = async () => {
    setLoading(true);
    setError('');
    setAudioUrl(''); // Reset audio URL

    try {
      if (isAdvMode) {
          await sendLargeText();
      } else {
        await sendSmallText();
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="form-group">
        <textarea 
          className="form-control" 
          style={{ height: '300px' }} 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here...">
        </textarea>
        <div className="d-flex justify-content-end mt-2">
          <small 
            className="form-text"
            style={{ color: isOverLimit ? 'red' : isCloseToLimit ? 'orange' : 'gray' }}>
            {text.length} / {applicableCharacterLimit}
          </small>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError('')}></button>
        </div>
      )}

      <div className="mt-3">
        <button 
          className={`btn ${loading ? 'btn-secondary' : 'btn-primary'} mb-2`}
          disabled={loading || text.length < 3 || text.length > characterLimit}
          onClick={processText} >
          <i className={`${!loading ? 'bi bi-play-fill' : 'spinner-border spinner-border-sm' }`} style={{ marginRight: '8px' }}></i>
          {loading ? 'Processing...' : 'AI, Read It!'}
        </button>
      </div>
      {isTextTooShort && 
        <p className="text-muted mt-1" style={{ fontSize: '0.8em' }}>
          Please, enter text in the field above (3 symbols or more)
        </p>}
      {isOverLimit && 
        <p className="text-danger mt-1" style={{ fontSize: '0.8em' }}>
          Make the text shorter
        </p>}

      {!isAdvMode && audioUrl && (
        <div className="d-flex align-items-center ">
          <audio controls src={audioUrl} className="w-100 mt-2" autoPlay />
          <button onClick={() => setAudioUrl('')} className="btn btn-close" style={{marginTop: '.5em'}}></button>
        </div>
      )}
      
      {isAdvMode && 
        <audio controls className="w-100 mt-2" ref={audioRef} autoPlay></audio>
      }
    </div>
  );
};

export default TextToSpeechApp;
