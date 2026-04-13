import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const solutions = [
  {
    title: "Commercial Safety",
    stat: "500+",
    label: "Projects Done",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Industrial Systems",
    stat: "1.2k",
    label: "Inspections",
    image: "https://images.unsplash.com/photo-1542353436-312f0ee9429b?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Residential Plans",
    stat: "99%",
    label: "Success Rate",
    image: "https://images.unsplash.com/photo-1518005020251-58296d8f51f0?auto=format&fit=crop&q=80&w=600"
  }
];

const Solutions = () => {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-accent text-white rounded-[3rem] lg:rounded-[5rem] mt-20 lg:mt-32 max-w-[98%] mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20 px-4">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-primary font-bold tracking-widest uppercase text-xs sm:text-sm">
              <span className="w-8 md:w-10 h-[2px] bg-primary"></span>
              TAILORED SOLUTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.2] lg:leading-tight">
              We provide specific <span className="text-primary italic">safety solutions</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-sm text-center lg:text-left font-medium leading-relaxed">
            Every building has unique needs. Our expert team designs custom fire protection strategies for maximum efficiency.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {solutions.map((sol, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -15 }}
              className="group relative h-[450px] lg:h-[600px] rounded-[3rem] overflow-hidden"
            >
              <img src={sol.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={sol.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-10 left-10 right-10 flex flex-col items-center text-center">
                <p className="text-primary font-black text-4xl lg:text-5xl mb-1">{sol.stat}</p>
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-white/60 mb-6">{sol.label}</p>
                <h3 className="text-2xl lg:text-3xl font-black mb-8">{sol.title}</h3>
                <a href="#" className="w-12 h-12 lg:w-16 lg:h-16 bg-white text-accent rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-2xl">
                  <ArrowRight size={24} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
