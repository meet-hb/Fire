import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Info, PhoneCall } from 'lucide-react';

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 lg:py-32 bg-secondary-light/50 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative lg:sticky lg:top-32 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-primary font-bold tracking-widest uppercase text-xs sm:text-sm">
              <span className="w-8 md:w-10 h-[2px] bg-primary"></span>
              {data.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-accent leading-[1.2] lg:leading-tight mb-8">
              {data.title}
            </h2>
            <p className="text-sm sm:text-lg text-accent/60 font-medium leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Find answers to the most common questions about our fire protection services and safety standards.
            </p>
            
            <div className="bg-primary p-8 sm:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group max-w-md mx-auto lg:mx-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full translate-x-8 -translate-y-8" />
              <Info size={40} className="mb-6 opacity-20 sm:w-12 sm:h-12" />
              <h4 className="text-xl sm:text-2xl font-black mb-4">Still have questions?</h4>
              <p className="text-sm sm:text-base text-white/80 font-medium mb-8 leading-relaxed">Our expert team is here to help you 24/7 with any safety concerns.</p>
              <button className="flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-bold hover:shadow-xl hover:bg-secondary-light transition-all w-full sm:w-auto text-xs sm:text-sm">
                <PhoneCall size={18} /> Contact Support
              </button>
            </div>
          </motion.div>

          <div className="space-y-4 sm:space-y-6 mt-8 lg:mt-0">
            {data.items.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-[2rem] border-2 transition-all duration-500 overflow-hidden ${
                  activeIndex === i ? 'bg-white border-primary/20 shadow-2xl' : 'bg-transparent border-primary/5 hover:border-primary/20'
                }`}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left"
                >
                  <span className={`text-base sm:text-xl font-black ${activeIndex === i ? 'text-primary' : 'text-accent'}`}>{item.q}</span>
                  <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    activeIndex === i ? 'bg-primary text-white rotate-180' : 'bg-primary/10 text-primary'
                  }`}>
                    {activeIndex === i ? <Minus size={18} className="sm:w-5 sm:h-5" /> : <Plus size={18} className="sm:w-5 sm:h-5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="p-6 sm:p-8 pt-0 text-sm sm:text-lg text-accent/60 font-medium leading-relaxed border-t border-primary/5 mx-6 sm:mx-8 mt-[-1px] py-6 sm:py-8">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;


