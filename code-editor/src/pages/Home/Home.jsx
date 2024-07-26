import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import LearnMoreSection from '../../components/LearnMoreSection/LearnMoreSection';

const Home = ({ name }) => {
  return (
    <div>
      <HeroSection name={name} />
      <LearnMoreSection />
    </div>
  );
};

export default Home;
