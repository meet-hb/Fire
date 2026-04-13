import React from 'react';
import HeroV2 from '../components/HeroV2';
import ServicesV2 from '../components/ServicesV2';
import AboutV2 from '../components/AboutV2';
import FeaturesV2 from '../components/FeaturesV2';

const HomeV2 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="overflow-x-hidden">
      <HeroV2 data={data.hero} />
      <div id="services">
        <ServicesV2 data={data.services} />
      </div>
      <div id="about">
        <AboutV2 data={data.about} />
      </div>
      <FeaturesV2 data={data.features} />
    </div>
  );
};

export default HomeV2;
