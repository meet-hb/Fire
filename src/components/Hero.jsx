import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users } from 'lucide-react';

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section id="home" className="bg-[#FEF3E2] pt-48 pb-12 lg:pb-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5rem] overflow-hidden relative min-h-[600px] lg:min-h-[800px] flex items-center shadow-2xl mt-5">

        {/* Decorative elements */}
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full" />

        <div className="w-full px-8 sm:px-12 lg:px-24 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="text-left">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
                  {data?.tagline || 'WELCOME TO WELDOSELD'}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 lg:mb-10 max-w-xl">
                {data?.title || 'Protecting lives with trusted fire safety'}
              </h1>
              <p className="text-base sm:text-lg text-white/60 mb-10 lg:mb-12 max-w-lg leading-relaxed font-medium">
                {data?.description || 'Advanced fire protection solutions for industrial and residential assets.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <button className="bg-primary text-white px-10 py-5 rounded-full font-black flex items-center justify-center gap-4 shadow-xl shadow-primary/20 uppercase text-xs tracking-widest group">
                  Get a Free Quote <ArrowRight size={18} />
                </button>
                <button className="bg-transparent border-2 border-primary text-white px-10 py-5 rounded-full font-black flex items-center justify-center gap-4 shadow-xl uppercase text-xs tracking-widest group">
                  Speak to Expert <ArrowRight size={18} />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm font-bold">Google Rating <span className="text-primary">5.0</span></span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#F26522" className="text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
              <div className="relative">
                <img
                  src={data?.image || "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1000"}
                  alt="Firefighter"
                  className="relative z-10 w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[450px] object-contain drop-shadow-2xl mx-auto lg:mx-0"
                />

                <div className="absolute -right-4 sm:-right-10 bottom-[10%] sm:bottom-[15%] bg-primary p-4 sm:p-6 rounded-2xl sm:rounded-3xl z-20 flex items-center gap-3 sm:gap-4 shadow-2xl scale-90 sm:scale-100">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-xl">
                    <Users size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-white font-black text-xl sm:text-2xl leading-none">3,500+</p>
                    <p className="text-white/80 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Satisfied Clients</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
