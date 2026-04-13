import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const FeaturesV3 = ({ data }) => {
  return (
    <section className="py-24 bg-white overflow-hidden px-4 border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-stretch">
        {/* Left header column */}
        <div className="lg:w-1/3 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-primary p-2.5 rounded-lg shadow-xl shadow-primary/20">
              <Check className="text-white w-5 h-5" />
            </div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">
              WHY PARTNER WITH US
            </span>
          </div>
          <h2 className="text-5xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic mb-10">
            Certified <br /> Protection.
          </h2>
          <p className="text-slate-400 font-bold mb-12 leading-relaxed text-lg border-l-4 border-primary pl-8 max-w-sm">
            We provide precision-engineered fire safety infrastructure with zero-compromise quality for high-risk assets.
          </p>
          <div className="flex gap-4 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 items-center">
            <div className="text-primary text-4xl font-black italic">24/7</div>
            <p className="text-slate-900 font-black tracking-widest text-[9px] uppercase leading-relaxed">Technical assistance <br /> across India.</p>
          </div>
        </div>

        {/* Right content column (masonry list) */}
        <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
          {data.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-10 lg:p-14 border border-slate-100 rounded-[3rem] group transition-all duration-500 hover:bg-slate-900 hover:text-white cursor-pointer hover:shadow-2xl relative ${i === 1 ? 'md:mt-16 bg-slate-50' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-3xl font-black text-slate-100 group-hover:text-primary transition-colors duration-500 italic">
                  0{i + 1}
                </span>
                <div className="p-4 bg-primary rounded-2xl shadow-xl shadow-primary/20 scale-75 group-hover:scale-110 transition-transform">
                  <ArrowRight className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight italic mb-6 leading-none group-hover:text-primary">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm font-bold leading-relaxed mb-10 group-hover:text-white/60 transition-colors">
                {feature.description}
              </p>
              <div className="aspect-video rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesV3;
