import React from 'react';
import { motion } from 'framer-motion';

const featureData = [
  {
    id: "01",
    title: "Custom Fire Protection Plans",
    desc: "Tailored fire safety solutions based on your property's unique need.",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "02",
    title: "Advanced Fire Alarm Systems",
    desc: "State of the art fire alarm systems designed for early detection.",
    image: "https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "03",
    title: "Evacuation Planning & Drills",
    desc: "We develop customized emergency evacuation plans.",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=800"
  }
];

const Features = ({ data }) => {
  const displayData = Array.isArray(data) ? data : featureData;

  return (
    <section id="features" className="py-20 lg:py-32 bg-[#FEF3E2] px-4 sm:px-6 lg:px-10">
      {/* Outer Rounded Container */}
      <div className="max-w-[1600px] mx-auto bg-white/40 rounded-[3rem] lg:rounded-[5rem] py-20 lg:py-24 px-8 sm:px-12 lg:px-20 shadow-sm">
        
        {/* Header Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-16 lg:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
                OUR FEATURES
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-accent leading-[1.1]">
              Tailored solutions for <br/> <span className="text-accent/40">maximum protection</span>
            </h2>
          </div>
          <p className="text-accent/60 text-sm sm:text-lg font-medium leading-relaxed max-w-lg lg:ml-auto">
            Our fire safety solutions combine cutting edge technology, certified expertise, and customized strategies to protect your property and ensure compliance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {displayData.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="relative h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden group shadow-2xl"
            >
              {/* Main Image */}
              <img 
                src={feature.image || feature.img || "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800"} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt={feature.title} 
              />
              
              {/* Number Badge */}
              <div className="absolute top-8 left-8 w-12 h-12 lg:w-14 lg:h-14 bg-primary rounded-full flex items-center justify-center text-white font-black text-lg lg:text-xl shadow-xl z-20">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Glass Content Overlay */}
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 bg-black/30 backdrop-blur-xl border border-white/10 p-6 lg:p-10 rounded-[2.5rem] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-xl lg:text-2xl font-black text-white mb-4 leading-tight">{feature.title}</h3>
                <p className="text-white/70 text-sm lg:text-base font-medium leading-relaxed">
                  {feature.description || feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
