import React from 'react';

import { cdnBaseUrl } from '../config';

const Footer = () => {
  return (
    <footer className="footer mt-4 py-3">
      <div className="container text-center">
        <p className="small gray-links">
          © {new Date().getFullYear()} AI, Read It! - All rights reserved.<br />
          <span className="small text-muted"><em>Note: The voice you hear from the application is AI-generated and not a human voice.</em></span><br />
          <span className="small text-muted"><a href={`${cdnBaseUrl}/legal/ai-read-it-privacy-policy.pdf`} target='_blank' rel='noreferrer'>Privacy Policy</a>. <a href={`${cdnBaseUrl}/legal/ai-read-it-terms-of-service.pdf`} target='_blank' rel='noreferrer'>Terms of Service</a>.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
