import React, { useState, useEffect } from 'react';
import HeroV2 from '../components/HeroV2';
import ServicesV2 from '../components/ServicesV2';
import AboutV2 from '../components/AboutV2';
import FeaturesV2 from '../components/FeaturesV2';
import { getContent } from '../api/contentService';
import { content } from '../data/content';

const HomeV2 = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-[#0A0705]">
       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="overflow-x-hidden">
      <HeroV2 data={data.hero} />
      <div id="services">
        <ServicesV2 data={data.services || []} />
      </div>
      <div id="about">
        <AboutV2 data={data.about} />
      </div>
      <FeaturesV2 data={data.features || []} />
    </div>
  );
};

export default HomeV2;
