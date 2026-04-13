import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const AboutV3 = ({ data }) => {
  return (
    <section className="bg-white py-24 overflow-hidden border-t border-slate-100 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch min-h-[700px]">
        {/* Large Grid Image Content */}
        <div className="lg:w-1/2 relative group rounded-[4rem] overflow-hidden shadow-2xl">
          <img 
            src={data?.image || "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800"} 
            className="w-full h-full object-cover grayscale-0 hover:grayscale transition-all duration-1000" 
            alt="Safety Industrial"
          />
          {/* Statistical overlay card */}
          <div className="absolute top-10 left-10 right-10 flex gap-4">
             {data?.stats?.slice(0, 2).map((stat, i) => (
               <div key={i} className="flex-1 bg-primary p-4 rounded-3xl border border-white/20 shadow-xl">
                  <p className="text-white text-3xl font-black italic">{stat.value}</p>
                  <p className="text-white/60 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Professional content section */}
        <div className="lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-24 py-12 sm:py-20 bg-slate-50 relative rounded-[2.5rem] lg:rounded-l-none lg:rounded-r-[4rem] mt-6 lg:mt-0">
          <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs mb-6 sm:mb-8">INDUSTRIAL RELIABILITY</span>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic mb-8 sm:mb-10">
            Engineered to <br/> Protect.
          </h2>
          <p className="text-slate-500 font-bold mb-8 sm:mb-12 leading-relaxed text-base sm:text-lg border-l-4 border-primary pl-6 sm:pl-8 max-w-lg">
            {data?.description || "Providing comprehensive industrial fire suppression systems and high-risk asset management."}
          </p>
          
          <div className="space-y-6 mb-12">
             {['Certified Professionals', 'ISO 9001 Standards', 'High-Risk Engineering'].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                   <CheckCircle2 className="text-primary w-6 h-6 group-hover:scale-125 transition-transform" />
                   <p className="text-slate-900 font-black uppercase tracking-widest text-xs italic">{item}</p>
                </div>
             ))}
          </div>

          <button className="bg-slate-900 text-white py-6 px-12 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-4 group shadow-xl max-w-fit">
            View Credentials
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutV3;
