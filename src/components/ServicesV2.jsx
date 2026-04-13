import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ServicesV2 = ({ data }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#0A0705] text-white overflow-hidden px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-20 gap-8 sm:gap-10">
          <div className="max-w-2xl">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-4 sm:mb-6 block">OUR EXPERTISE</span>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter italic uppercase leading-none">
              High Impact <br/> Protection.
            </h2>
          </div>
          <p className="text-white/40 font-medium max-w-sm border-l border-white/10 pl-6 sm:pl-8 text-sm sm:text-base">
            Specialized fire safety engineering for critical infrastructure and luxury assets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(data) && data.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="relative aspect-[3/4] group overflow-hidden rounded-[2rem] cursor-pointer"
            >
              <img 
                src={service.image || "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800"} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                alt={service.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2 italic">{service.title}</h3>
                <p className="text-white/60 text-xs font-bold leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                  {service.description}
                </p>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform shadow-xl">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesV2;
