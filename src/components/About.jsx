import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Award, Clock, Star } from 'lucide-react';

const About = ({ data }) => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-[#FEF3E2] px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Left Side: Image Composition */}
          <div className="relative">
            {/* Vertical Review Text */}
            <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 -rotate-90 hidden xl:block">
              <p className="text-[#2D1E16]/20 font-black text-xs tracking-[0.5em] uppercase whitespace-nowrap">
                5200+ FIVE STAR REVIEWS
              </p>
            </div>

            <div className="relative">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl lg:max-w-[550px]"
              >
                <img
                  src={data?.image || "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800"}
                  alt="About Firegard"
                  className="w-full h-auto object-cover lg:max-w-[550px]"
                />
              </motion.div>

              {/* Floating Badge: Years of Experience */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-6 left-[-15px] sm:left-[-50px] bg-primary p-4 sm:p-8 rounded-2xl sm:rounded-3xl z-20 shadow-2xl flex flex-col items-center gap-1 sm:gap-2 max-w-[120px] sm:max-w-[180px] scale-90 sm:scale-100"
              >
                <div className="bg-white/20 p-2 rounded-xl text-white">
                  <Award size={24} className="sm:w-8 sm:h-8" />
                </div>
                <p className="text-white font-black text-center text-[10px] sm:text-lg leading-tight uppercase tracking-wider">
                  30 + years of experience
                </p>
              </motion.div>

              {/* Inset Image: Chef using extinguisher */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-[-20px] sm:bottom-[-40px] right-[-10px] sm:right-[-40px] w-[140px] sm:w-[280px] z-30 rounded-3xl sm:rounded-[2.5rem] overflow-hidden border-4 sm:border-[10px] border-[#FEF3E2] shadow-2xl"
              >
                <img
                  src={data?.image2 || "https://images.unsplash.com/photo-1599059021644-80252390a424?auto=format&fit=crop&q=80&w=400"}
                  alt="Extinguisher Use"
                  className="w-full h-full object-cover "
                />
              </motion.div>
            </div>
          </div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
                {data?.subtitle || 'ABOUT US'}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-accent leading-[1.1]">
              {data?.title || 'Expert guidance and fire safety protection.'}
            </h2>

            <p className="text-sm sm:text-base text-accent/60 font-medium leading-relaxed max-w-xl">
              {data?.description || 'Fire alarm systems and extinguisher servicing to emergency evacuation planning and compliance inspections, our certified team is dedicated to keeping your people safe.'}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-1 rounded-full text-primary">
                  <CheckCircle2 size={20} fill="currentColor" className="text-primary" fillOpacity={0.2} />
                </div>
                <span className="text-accent font-black text-sm sm:text-base tracking-tight">Fire Alarm System Installation & Maintenance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-1 rounded-full text-primary">
                  <CheckCircle2 size={20} fill="currentColor" className="text-primary" fillOpacity={0.2} />
                </div>
                <span className="text-accent font-black text-sm sm:text-base tracking-tight">Extinguisher Supply & Servicing</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 items-center pt-6 border-t border-accent/5">
              {/* Clients */}
              <div className="flex flex-col gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="client" />
                  ))}
                </div>
                <p className="text-accent/40 text-xs font-bold uppercase tracking-widest">Join our <span className="text-accent">5000+</span> satisfied client</p>
              </div>

              {/* Support */}
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-2xl text-white shadow-lg shadow-primary/20">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-accent font-black text-lg leading-none mb-1">24 x 7 Response</p>
                  <p className="text-accent/40 text-xs font-bold uppercase tracking-widest">Award wining</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button className="bg-primary text-white p-2 pl-8 lg:pl-10 pr-2 rounded-full font-black flex items-center justify-between gap-8 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 uppercase text-xs lg:text-sm tracking-widest group max-w-fit">
                More About Us
                <div className="bg-white text-primary p-3 rounded-full group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} />
                </div>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
