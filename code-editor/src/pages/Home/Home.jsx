import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import LearnMoreSection from '../../components/LearnMoreSection/LEarnMoreSection';

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
