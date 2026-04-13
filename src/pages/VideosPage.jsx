import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { getContent } from '../api/contentService';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getContent('videos');
      if (data && Array.isArray(data)) setVideos(data);
    };
    fetchVideos();
  }, []);

  return (
    <div className="pt-48 bg-[#FEF3E2] min-h-screen">
      <section className="px-4 sm:px-6 lg:px-10 mb-20">
        <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5rem] py-20 lg:py-32 px-10 sm:px-20 text-center shadow-2xl">
          <h1 className="text-5xl lg:text-8xl font-black text-white mb-6">Videos</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs lg:text-sm">Educational & Insightful</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto py-20">
        <div className="grid md:grid-cols-2 gap-10">
          {videos.map((vid, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group rounded-[3rem] overflow-hidden shadow-xl"
            >
              <img src={vid.thumb} alt={vid.title} className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white">
                  <Play size={32} fill="white" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-black text-white">{vid.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VideosPage;
