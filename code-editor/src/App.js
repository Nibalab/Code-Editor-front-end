// src/App.js
import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar';
import HeroSection from '../src/components/HeroSection/HeroSection';
import LearnMoreSection from '../src/components/LearnMoreSection/LEarnMoreSection';
import Footer from '../src/components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <LearnMoreSection />
      <Footer />
    </div>
  );
};
export default App;
