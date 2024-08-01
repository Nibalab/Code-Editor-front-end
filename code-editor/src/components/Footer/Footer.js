import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="icon-facebook"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="icon-twitter"></i></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="icon-linkedin"></i></a>
        </div>
        <p>© 2024 CodeEditor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
