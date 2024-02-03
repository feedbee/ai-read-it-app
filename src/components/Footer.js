import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-4 py-3">
      <div className="container text-center">
        <p className="small">
          © {new Date().getFullYear()} AI, Read It! - All rights reserved. <br />
          <span className="small text-muted"><em>Note: The voice you hear from the application is AI-generated and not a human voice.</em></span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
