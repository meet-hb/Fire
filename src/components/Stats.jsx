import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Users, Target } from 'lucide-react';

const stats = [
  { id: 1, label: "Safety Success Rate", value: "99%", icon: Shield, color: "text-primary" },
  { id: 2, label: "Emergency Response", value: "100%", icon: Zap, color: "text-accent" },
  { id: 3, label: "Certified Experts", value: "50+", icon: Users, color: "text-primary" },
  { id: 4, label: "Happy Clients", value: "2.5k+", icon: Target, color: "text-accent" },
];

const Stats = () => {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="w-full lg:w-1/3 text-center lg:text-left">
           <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-primary font-bold tracking-widest uppercase text-xs sm:text-sm">
             <span className="w-8 md:w-10 h-[2px] bg-primary"></span>
             EASY HANDLING
           </div>
           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-accent leading-[1.2] lg:leading-tight mb-8">
             Your reliable <span className="text-primary italic">safety partner</span>
           </h2>
           <p className="text-sm sm:text-base text-accent/60 font-medium leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
             We ensure top-tier fire protection using state-of-the-art technology and verified safety protocols.
           </p>
           <button className="bg-primary text-white px-8 py-3.5 rounded-full font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 uppercase text-xs tracking-widest">
             Learn More
           </button>
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              whileHover={{ scale: 1.05 }}
              className="p-8 sm:p-10 rounded-[2.5rem] bg-secondary-light border border-primary/5 hover:border-primary/20 transition-all text-center group"
            >
              <div className={`mx-auto w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all`}>
                <stat.icon size={stat.id % 2 === 0 ? 24 : 28} className={stat.id % 2 === 0 ? "" : "text-primary group-hover:text-white"} />
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent mb-2">{stat.value}</h3>
              <p className="text-[10px] sm:text-xs font-bold text-accent/40 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
