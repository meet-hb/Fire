import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Features from '../components/Features';

const HomeV1 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="overflow-x-hidden">
      <Hero data={data.hero} />
      <div id="services">
        <Services data={data.services} />
      </div>
      <div id="about">
        <About data={data.about} />
      </div>
      <Features data={data.features} />
    </div>
  );
};

export default HomeV1;
