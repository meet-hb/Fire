import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, PhoneCall } from 'lucide-react';

const HeroV3 = ({ data }) => {
  return (
    <section className="relative min-h-screen flex items-stretch bg-white">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 flex items-center px-6 sm:px-16 lg:px-24 py-16 sm:py-32 bg-slate-900 border-r border-white/5 relative overflow-hidden">
        {/* Decorative Grid Line */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6 sm:mb-10"
          >
            <div className="bg-primary p-2.5 rounded-lg shadow-xl shadow-primary/20">
              <Lock className="text-white w-5 h-5" />
            </div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs">
              {data?.tagline || 'ISO CERTIFIED SAFETY'}
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-[7rem] font-black text-white mb-8 sm:mb-10 leading-[0.9] tracking-tight uppercase italic">
            {data?.title || 'Heavy Duty Protection.'}
          </h1>

          <p className="text-white/40 text-base sm:text-xl font-medium max-w-lg mb-10 sm:mb-12 leading-relaxed border-l-4 border-primary pl-6 sm:pl-8">
            {data?.description || 'Commercial fire suppression systems and high-risk asset management for global infrastructure.'}
          </p>

          <div className="flex flex-wrap gap-6 pt-6">
            <button className="bg-white text-slate-900 py-6 px-12 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl">
              Get Quote Now
            </button>
            <button className="flex items-center gap-4 text-white font-black text-sm uppercase tracking-widest hover:text-primary transition-colors border-2 border-white/10 px-10 rounded-2xl">
              <PhoneCall size={18} />
              Support
            </button>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden lg:block w-1/2 relative group">
        <img 
          src={data?.image || "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800"} 
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
          alt="Fire Protection Image"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-30 group-hover:opacity-10 transition-opacity" />
      </div>
    </section>
  );
};

export default HeroV3;
