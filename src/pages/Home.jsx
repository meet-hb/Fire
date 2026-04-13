import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Expertise from '../components/Expertise';
import About from '../components/About';
import Features from '../components/Features';

const Home = ({ data }) => {
  // Use passed data or fallback to local content (though App.jsx handles loading)
  if (!data) return null;

  return (
    <div className="overflow-x-hidden">
      <Hero data={data.hero} />
      <div id="services">
        <Services data={data.services} />
      </div>
      <div id="about">
        <Expertise data={data.expertise} />
        <About data={data.about} />
      </div>
      <Features data={data.features} />
    </div>
  );
};

export default Home;
