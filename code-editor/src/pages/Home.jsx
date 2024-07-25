import React from 'react';
import HeroSection from '../../src/components/HeroSection/HeroSection';
import LearnMoreSection from '../../src/components/LearnMoreSection/LearnMoreSection';

const Home = ({ name }) => {
  return (
    <div>
      <HeroSection name={name} />
      <LearnMoreSection />
      <div>
        {name ? `Hi ${name}` : 'You are not logged in'}
      </div>
    </div>
  );
};

export default Home;
