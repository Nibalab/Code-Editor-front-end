import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroSection.css';

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.from(heroRef.current, { duration: 1, opacity: 0, ease: 'power3.out' });
    gsap.from(textRef.current, { duration: 1, opacity: 0, y: 30, delay: 0.5, ease: 'power3.out' });
    gsap.from(ctaRef.current.children, { duration: 1, opacity: 0, y: 30, stagger: 0.2, delay: 1, ease: 'power3.out' });
  }, []);

  return (
    <header className="hero-section" ref={heroRef}>
      <div className="container">
        <h1 ref={textRef}>Welcome to CodeEditor</h1>
        <p>Your interactive code editor and developer community platform. Write, compile, and collaborate with ease.</p>
        <div className="cta-buttons" ref={ctaRef}>
          <a href="#learn-more" className="btn btn-primary">Get Started</a>
          <a href="#learn-more" className="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
