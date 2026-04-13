import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Home, Calendar, Monitor } from 'lucide-react';

const serviceData = [
  {
    icon: Shield,
    title: "Commercial Security",
    desc: "We are committed to providing professional grade security for your commercial assets."
  },
  {
    icon: Home,
    title: "Residential Security",
    desc: "Keeping your home and family safe with advanced fire detection systems."
  },
  {
    icon: Calendar,
    title: "Event Security",
    desc: "On-site fire monitoring and safety management for events of all sizes."
  },
  {
    icon: Monitor,
    title: "CCTV Monitoring",
    desc: "24/7 remote monitoring and surveillance to detect hazards instantly."
  }
];

const Services = ({ data }) => {
  return (
    <section id="services" className="py-20 lg:py-32 bg-[#FEF3E2] px-4 sm:px-6 lg:px-10">
      {/* Outer Rounded Container */}
      <div className="max-w-[1600px] mx-auto bg-white/40 rounded-[3rem] lg:rounded-[5rem] py-20 lg:py-24 px-8 sm:px-12 lg:px-20 shadow-sm">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
              OUR SERVICES
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-accent leading-[1.2]">
            Fire safety services tailored <br className="hidden lg:block"/> for maximum protection
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(Array.isArray(data) ? data : serviceData).map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white p-10 rounded-[2.5rem] flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="text-primary">
                {service.icon && typeof service.icon === 'string' && (service.icon.startsWith('http') || service.icon.startsWith('/')) ? (
                  <img src={service.icon} alt={service.title} className="w-14 h-14 object-contain" />
                ) : service.icon && typeof service.icon === 'string' ? (
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center font-black text-primary italic text-xl">
                    {service.title?.charAt(0) || 'S'}
                  </div>
                ) : (
                  service.icon ? <service.icon size={48} strokeWidth={1.5} /> : <Shield size={48} strokeWidth={1.5} />
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-black text-accent mb-3">{service.title || 'Service Title'}</h3>
                <p className="text-accent/40 text-sm font-medium leading-relaxed">
                  {service.description || service.desc || 'Comprehensive fire protection and safety services.'}
                </p>
              </div>

              <div className="mt-auto pt-4">
                <button className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-all group-hover:scale-110">
                  <ArrowUpRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16 lg:mt-24">
          <p className="text-accent/40 text-sm sm:text-base font-bold max-w-2xl mx-auto leading-relaxed">
            Discover our range of fire protection services designed to meet all your needs. Ready <br className="hidden sm:block"/>
            to get started? Book your free fire safety consultation today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
