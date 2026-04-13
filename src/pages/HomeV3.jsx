import React, { useState, useEffect } from 'react';
import HeroV3 from '../components/HeroV3';
import ServicesV3 from '../components/ServicesV3';
import AboutV3 from '../components/AboutV3';
import FeaturesV3 from '../components/FeaturesV3';
import { getContent } from '../api/contentService';
import { content } from '../data/content';

const HomeV3 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const hero = await getContent('hero');
        const about = await getContent('about');
        const services = await getContent('services');
        const features = await getContent('features');
        
        setData({
          hero: hero || content.hero,
          about: about || content.about,
          services: services || content.services,
          features: features || []
        });
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading || !data) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="overflow-x-hidden">
      <HeroV3 data={data.hero} />
      <div id="services">
        <ServicesV3 data={data.services || []} />
      </div>
      <div id="about">
        <AboutV3 data={data.about} />
      </div>
      <FeaturesV3 data={data.features || []} />
    </div>
  );
};

export default HomeV3;
