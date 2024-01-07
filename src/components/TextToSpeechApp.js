import React, { useState, useRef } from 'react';
import { characterLimit, characterLimitLargeText, backendBaseUrl } from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TextToSpeechApp = ({settings}) => {
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
    const response = await fetch(`${backendBaseUrl}/tts-small`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      let errorMsg;
      try {
        const errorData = await response.json();
        errorMsg = errorData.error || 'Server error';
      } catch (jsonError) {
        // If parsing as JSON fails, use text response
        errorMsg = await response.text();
      }
      throw new Error(errorMsg);
    }

    const data = await response.blob();
    const newAudioUrl = URL.createObjectURL(data);
    setAudioUrl(newAudioUrl); // Set the new audio URL
    setLoading(false);
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

        const response = await fetch(`${backendBaseUrl}/tts-large`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

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
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError('')}></button>
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
