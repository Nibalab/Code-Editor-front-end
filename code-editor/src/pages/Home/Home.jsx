import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import LearnMoreSection from '../../components/LearnMoreSection/LEarnMoreSection.js';

const Home = ({ name }) => {
  return (
    <div>
      <HeroSection name={name} />
      <LearnMoreSection />
    </div>
  );
};

export default Home;
