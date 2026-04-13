import React from 'react';
import { motion } from 'framer-motion';

const ClientsPage = () => {
  const categories = [
    { title: "Residential", count: "2500+" },
    { title: "Commercial", count: "1200+" },
    { title: "Industrial", count: "450+" },
    { title: "Government", count: "80+" }
  ];

  return (
    <div className="pt-48 bg-[#FEF3E2] min-h-screen">
      <section className="px-4 sm:px-6 lg:px-10 mb-20">
        <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5rem] py-20 lg:py-32 px-10 sm:px-20 text-center shadow-2xl ">
          <h1 className="text-5xl lg:text-8xl font-black text-white mb-6">Our Clients</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs lg:text-sm">Thousands of Protected Properties</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-12 rounded-[3.5rem] text-center shadow-sm hover:shadow-xl transition-all"
            >
              <p className="text-5xl font-black text-primary mb-4">{cat.count}</p>
              <p className="text-xs font-bold text-accent/40 uppercase tracking-widest">{cat.title} Clients</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-sm">
          <h2 className="text-3xl lg:text-5xl font-black text-accent mb-12 text-center">Trusted By Industry Leaders</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-10 opacity-30">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-10 bg-accent rounded-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientsPage;
