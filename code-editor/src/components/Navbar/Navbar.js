import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './Navbar.css';

const Navbar = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    gsap.from(navbarRef.current, { duration: 1, opacity: 0, y: -50, ease: 'power3.out' });
  }, []);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="container">
        <Link to="/" className="navbar-brand">CodeEditor</Link>
        <div className="navbar-center">
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/chat">Chat</Link>
          </div>
        </div>
        <div className="navbar-actions">
          <Link to="/profile" className="btn btn-profile">Profile</Link>
          <Link to="/login" className="btn btn-login">Login</Link>
          <Link to="/register" className="btn btn-signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
