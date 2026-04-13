import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, Activity } from 'lucide-react';

const FeaturesV2 = ({ data }) => {
  return (
    <section className="py-24 bg-[#0A0705] relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="flex flex-col items-center gap-6 mb-20">
          <div className="bg-white/5 py-3 px-8 rounded-full border border-white/10">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">ULTIMATE PROTECTION</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
            Excellence <br/> Redefined.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.isArray(data) && data.map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 lg:p-16 rounded-[4rem] text-left group hover:bg-white/10 transition-all duration-700 relative shadow-2xl"
            >
              <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-100 transition-opacity">
                 <ShieldCheck className="text-primary w-12 h-12" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white italic mb-6 leading-none">
                {feature.title}
              </h3>
              <p className="text-white/40 text-sm font-bold leading-relaxed mb-10 max-w-[250px]">
                {feature.description}
              </p>
              <div className="w-16 h-16 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesV2;
