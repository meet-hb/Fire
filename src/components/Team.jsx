import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6';

const Team = ({ data }) => {
  return (
    <section id="portfolio" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 px-4 text-center md:text-left">
          <div className="max-w-xl mx-auto md:mx-0">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6 text-primary font-bold tracking-widest uppercase text-xs sm:text-sm">
              <span className="w-8 md:w-10 h-[2px] bg-primary"></span>
              {data.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-accent leading-[1.2] lg:leading-tight">
              Trustsafe team consultant
            </h2>
          </div>
          <button className="hidden sm:flex items-center gap-3 bg-secondary-light text-primary border border-primary/20 px-10 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/5 text-xs uppercase tracking-widest font-black">
            View All Members <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {Array.isArray(data?.members) && data.members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-2xl">
                <img 
                  src={member.image} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                  alt={member.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Social Links on Hover */}
                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 translate-y-20 group-hover:translate-y-0 transition-all duration-500 delay-100 px-4">
                  {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-10 h-10 md:w-11 md:h-11 bg-white text-primary rounded-xl flex items-center justify-center hover:bg-accent hover:text-white transition-all shadow-xl">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="text-center px-4">
                <h4 className="text-xl lg:text-2xl font-black text-accent mb-2 group-hover:text-primary transition-colors">{member.name}</h4>
                <p className="text-accent/40 font-bold uppercase text-[9px] lg:text-[10px] tracking-[0.3em]">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;



