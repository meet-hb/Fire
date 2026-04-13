import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';

const ServicesV3 = ({ data }) => {
  return (
    <section className="py-16 bg-white overflow-hidden px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-32">
        <div className="lg:w-1/3 pt-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-primary p-2.5 rounded-lg shadow-xl shadow-primary/20">
              <Flame className="text-white w-5 h-5" />
            </div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">
              CORE CAPABILITIES
            </span>
          </div>
          <h2 className="text-3xl lg:text-7xl font-black text-slate-900 mb-10 leading-[0.9] tracking-tight uppercase italic">
            Engineered Safety.
          </h2>
          <p className="text-slate-400 text-lg font-medium max-w-sm mb-12 leading-relaxed border-l-4 border-primary pl-8">
            Comprehensive protection solutions tailored for mission-critical infrastructure across India.
          </p>
        </div>

        <div className="lg:w-2/3 flex flex-col pt-12">
          {Array.isArray(data) && data.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group border-b border-slate-100 py-10 flex flex-col sm:flex-row items-center justify-between gap-10 hover:bg-slate-50 px-4 transition-all hover:scale-[1.02] active:scale-95 duration-500 cursor-pointer first:border-t"
            >
              <div className="flex items-center gap-12">
                <span className="text-4xl font-black text-slate-100 group-hover:text-primary transition-colors duration-500 italic">
                    0{i + 1}
                </span>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase tracking-tight italic text-slate-900 transition-colors group-hover:text-primary">{service.title}</h3>
                  <p className="text-slate-400 font-bold text-sm max-w-md opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-4 duration-500">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="p-6 bg-slate-100 rounded-full text-slate-300 group-hover:bg-primary group-hover:text-white transition-all transform hover:rotate-45">
                 <ArrowRight size={32} strokeWidth={3} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesV3;
