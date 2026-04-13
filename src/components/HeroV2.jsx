import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, PlayCircle } from 'lucide-react';

const HeroV2 = ({ data }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0A0705]">
      {/* Background with subtle glow */}
      <div className="absolute inset-0 z-0">
        <img 
          src={data?.image || "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1000"} 
          className="w-full h-full object-cover opacity-40 scale-110" 
          alt="Fire Protection Background" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0705]/80 via-transparent to-[#0A0705] backdrop-blur-[2px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 sm:p-12 lg:p-20 rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl"
        >
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <ShieldCheck className="text-primary w-5 h-5" />
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">
              {data?.tagline || 'PLATINUM PROTECTION'}
            </span>
          </div>

          <h1 className="text-4xl lg:text-8xl font-black text-white mb-6 sm:mb-8 leading-none tracking-tighter">
            {data?.title || 'Safety Without Compromise.'}
          </h1>

          <p className="text-white/60 text-base lg:text-2xl font-medium max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            {data?.description || 'Engineered for the most demanding industrial environments and complex residential safety needs.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-primary text-white py-5 px-12 rounded-full font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center gap-3 group shadow-2xl shadow-primary/20">
              Start Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest hover:text-primary transition-colors">
              <div className="bg-white/10 p-3 rounded-full">
                <PlayCircle size={24} />
              </div>
              Watch Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroV2;
