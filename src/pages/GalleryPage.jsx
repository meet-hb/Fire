import React from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../api/contentService';
import { content } from '../data/content';

const GalleryPage = () => {
  const [images, setImages] = React.useState(content.gallery || []);

  React.useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getContent('gallery');
        if (data && Array.isArray(data) && data.length > 0) {
          setImages(data);
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="pt-48 bg-[#FEF3E2] min-h-screen">
      <section className="px-4 sm:px-6 lg:px-10 mb-20">
        <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5rem] py-20 lg:py-32 px-10 sm:px-20 text-center shadow-2xl ">
          <h1 className="text-5xl lg:text-8xl font-black text-white mb-6">Gallery</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs lg:text-sm">Captured Moments of Safety</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.isArray(images) && images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-[2rem] overflow-hidden shadow-lg aspect-square hover:shadow-2xl transition-all"
            >
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
