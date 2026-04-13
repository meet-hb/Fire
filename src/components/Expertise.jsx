import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Expertise = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-20 lg:py-32 bg-[#F9F7F2] overflow-hidden">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* 📝 Left Content side */}
          <div className="flex-1 space-y-10 lg:pr-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                  {data.badge || 'WHO WE ARE'}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2D1E16] leading-[1.1] tracking-tighter">
                {data.title || 'Unlock your potential with our expertise'}
              </h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                {data.description || 'Fire incidents can strike without warning, causing damage, disruption, and putting lives at risk.'}
              </p>
            </div>

            {/* 📊 Circular Stats */}
            <div className="flex flex-wrap gap-10">
              {data.stats?.map((stat, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center p-2 group-hover:border-primary transition-all duration-500 relative">
                     <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                     <span className="text-2xl font-black text-[#2D1E16] relative z-10">{stat.value}</span>
                  </div>
                  <div className="max-w-[120px]">
                    <p className="text-sm font-black text-[#2D1E16] leading-tight uppercase tracking-tight">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-200 w-full" />

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-[#2D1E16]">
                  {data.subtitle || 'Certified and Experienced in fire protections'}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {data.subdescription || 'From advanced alarm systems and extinguishers to custom evacuation plans, our certified professionals handle every detail.'}
                </p>
              </div>

              <div className="space-y-4">
                {data.points?.map((point, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="bg-primary/10 p-1.5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <CheckCircle2 size={18} />
                    </div>
                    <p className="text-[#2D1E16] font-bold text-sm sm:text-base">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🖼️ Right Image side */}
          <div className="flex-1 relative w-full lg:max-w-[600px]">
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-8 border-white"
            >
              <img 
                src={data.image || "https://images.unsplash.com/photo-1599059021644-80252390a424?w=800&h=800&fit=crop"} 
                alt="Expertise" 
                className="w-full h-auto object-cover"
              />
              {/* Floating element */}
              <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl flex items-center gap-4 lg:hidden">
                 <div className="bg-primary p-2 rounded-xl text-white">
                    <CheckCircle2 size={24} />
                 </div>
                 <p className="text-[10px] font-black uppercase text-[#2D1E16] tracking-widest leading-none">Certified Pro Protection</p>
              </div>
            </motion.div>

            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Expertise;
