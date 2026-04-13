import React from 'react';
import { motion } from 'framer-motion';

const AboutV2 = ({ data }) => {
  return (
    <section className="py-24 bg-[#FEF3E2] relative overflow-hidden px-4">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <div className="flex flex-col items-center gap-6 mb-12 sm:mb-16">
          <div className="bg-primary/5 py-3 px-8 rounded-full border border-primary/10">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">ELEVATING SAFETY STANDARDS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-none tracking-tight italic uppercase">
            Built on <span className="text-primary italic">Trust</span>. <br/> Driven by <span className="text-primary italic">Excellence</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative h-[400px] sm:h-[600px] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-2xl group border-[6px] sm:border-8 border-white"
          >
            <img 
               src={data?.image || "https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&q=80&w=800"} 
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
               alt="Fire Safety About"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          </motion.div>

          <div className="space-y-12 text-left md:pl-16">
            <p className="text-slate-400 text-xl font-bold leading-relaxed border-l-4 border-primary pl-10">
               {data?.description || "Engineered for critical environments and luxury residential protection."}
            </p>

            <div className="grid grid-cols-1 gap-8">
              {Array.isArray(data?.stats) && data.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-8 bg-white/40 p-10 rounded-[2.5rem] border border-white/50 backdrop-blur-sm group hover:bg-primary transition-all duration-500">
                  <div className="text-primary text-5xl font-black italic group-hover:text-white transition-colors">{stat.value}</div>
                  <div className="space-y-1">
                    <p className="text-slate-900 font-bold uppercase tracking-widest text-xs group-hover:text-white transition-colors">{stat.label}</p>
                    <p className="text-slate-400 text-[10px] font-black group-hover:text-white/40 transition-colors italic">YEAR ON YEAR GROWTH</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutV2;
