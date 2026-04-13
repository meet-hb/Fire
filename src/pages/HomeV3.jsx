import React from 'react';
import HeroV3 from '../components/HeroV3';
import ServicesV3 from '../components/ServicesV3';
import AboutV3 from '../components/AboutV3';
import FeaturesV3 from '../components/FeaturesV3';

const HomeV3 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="overflow-x-hidden">
      <HeroV3 data={data.hero} />
      <div id="services">
        <ServicesV3 data={data.services} />
      </div>
      <div id="about">
        <AboutV3 data={data.about} />
      </div>
      <FeaturesV3 data={data.features} />
    </div>
  );
};

export default HomeV3;
