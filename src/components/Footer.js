import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-4 py-3">
      <div className="container text-center">
        <p className="small">© {new Date().getFullYear()} AI, Read It! - All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
