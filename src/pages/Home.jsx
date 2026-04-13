import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Features from '../components/Features';
import { getContent } from '../api/contentService';
import { content } from '../data/content';

const Home = () => {
  const [data, setData] = useState({
    hero: content.hero,
    about: content.about,
    services: content.services,
    features: []
  });

  useEffect(() => {
    const fetchHomeData = async () => {
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
    };
    fetchHomeData();
  }, []);

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

export default Home;
