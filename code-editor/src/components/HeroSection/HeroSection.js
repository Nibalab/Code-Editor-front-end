import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <header className="hero-section">
      <div className="container">
        <h1>Welcome to CodeEditor</h1>
        <p>Your interactive code editor and developer community platform. Write, compile, and collaborate with ease.</p>
        <div className="cta-buttons">
          <a href="#learn-more" className="btn btn-primary">Get Started</a>
          <a href="#learn-more" className="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
