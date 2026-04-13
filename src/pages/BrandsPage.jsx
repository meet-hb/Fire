import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../api/contentService';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getContent('brands');
      if (data && Array.isArray(data)) setBrands(data);
    };
    fetchBrands();
  }, []);

  return (
    <div className="pt-48 bg-[#FEF3E2] min-h-screen">
      <section className="px-4 sm:px-6 lg:px-10 mb-20">
        <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5rem] py-20 lg:py-32 px-10 sm:px-20 text-center shadow-2xl">
          <h1 className="text-5xl lg:text-8xl font-black text-white mb-6">Our Brands</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs lg:text-sm">Partners in Excellence</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          {Array.isArray(brands) && brands.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-12 rounded-[3rem] flex flex-col items-center justify-center gap-6 shadow-sm hover:shadow-xl transition-all border border-primary/5 group"
            >
              <img src={brand.logo} alt={brand.name} className="h-16 object-contain grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100" />
              <p className="text-accent font-black uppercase tracking-widest text-xs">{brand.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BrandsPage;
