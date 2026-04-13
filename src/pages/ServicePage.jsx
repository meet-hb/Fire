import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Home, Calendar, Monitor, Search, Droplets, CheckCircle2, Star, Quote, PhoneCall } from 'lucide-react';
import FAQ from '../components/FAQ';
import { content } from '../data/content';

const ServicePage = () => {
  return (
    <div className="pt-32">
      {/* 1. Header / Breadcrumb Banner */}
      <section className="px-4 sm:px-6 lg:px-10 mb-12 lg:mb-20">
        <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5rem] py-20 lg:py-32 px-10 sm:px-20 relative overflow-hidden text-center lg:text-left shadow-2xl">
          <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
          <h1 className="text-5xl lg:text-8xl font-black text-white mb-6 relative z-10">Our Services</h1>
          <nav className="flex items-center justify-center lg:justify-start gap-4 text-white/40 font-bold uppercase tracking-widest text-xs lg:text-sm relative z-10">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="w-4 h-[2px] bg-white/10" />
            <span className="text-white">Services</span>
          </nav>
        </div>
      </section>

      {/* 2. Services 6-Card Grid */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 lg:py-20 mb-20 lg:mb-32">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Commercial Security", desc: "Expert fire protection for high-rise buildings and smart complexes." },
            { icon: Home, title: "Residential Security", desc: "Advanced fire detection and sprinkler systems for homes." },
            { icon: Droplets, title: "Fire Extinguishers", desc: "Supply and maintenance of certified fire safety equipment." },
            { icon: Calendar, title: "Construction Site", desc: "Temporary fire safety measures for ongoing construction." },
            { icon: Search, title: "Mobile Patrol", desc: "Professional teams for recurring site inspections and monitoring." },
            { icon: Monitor, title: "CCTV Monitoring", desc: "24/7 remote monitoring and surveillance to detect hazards.", highlight: true },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 lg:p-14 rounded-[3rem] lg:rounded-[4rem] flex flex-col gap-8 transition-all duration-500 shadow-sm hover:shadow-2xl ${
                item.highlight ? 'bg-primary text-white' : 'bg-white text-accent'
              }`}
            >
              <div className={`${item.highlight ? 'text-white' : 'text-primary'}`}>
                <item.icon size={50} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-black mb-4">{item.title}</h3>
                <p className={`text-sm lg:text-base font-medium leading-relaxed mb-8 ${item.highlight ? 'text-white/80' : 'text-accent/40'}`}>
                  {item.desc}
                </p>
                <a href="#" className={`inline-flex items-center gap-2 font-black uppercase text-xs tracking-widest border-b-2 transition-all pb-1 ${
                  item.highlight ? 'border-white/20 hover:border-white' : 'border-primary/10 hover:border-primary'
                }`}>
                  View Details <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Testimonials / Stats Row (Dark Banner) */}
      <section className="px-4 sm:px-6 lg:px-10 mb-20 lg:mb-32">
        <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5.5rem] p-10 lg:p-24 grid lg:grid-cols-2 gap-20 items-center relative overflow-hidden shadow-2xl">
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
          
          <div className="text-white">
             <div className="flex items-center gap-3 mb-8">
               <div className="w-2 h-2 bg-primary rounded-full" />
               <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">TESTIMONIALS</span>
             </div>
             <h2 className="text-3xl lg:text-5xl font-black leading-[1.2] mb-12 max-w-xl">Customer experiences with our fire safety services</h2>
             <div className="flex flex-col gap-10">
               <p className="text-xl lg:text-2xl font-bold leading-relaxed italic text-white/60">
                 "Professional provided exceptional service for our safety needs. Their team was efficient, and their attention to detail is remarkable. Highly recommend."
               </p>
               <div className="flex items-center gap-4">
                 <img src="https://i.pravatar.cc/100?u=cecelia" className="w-16 h-16 rounded-full border-2 border-primary/20" alt="Cecilia" />
                 <div>
                   <p className="text-xl font-black">Cecelia Services</p>
                   <p className="text-xs font-bold text-primary uppercase tracking-widest">Customer</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-xl p-10 lg:p-14 rounded-[3.5rem] border border-white/5">
               <p className="text-primary font-black text-5xl lg:text-7xl mb-4">12k+</p>
               <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Protective Assets Secured Globally</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-10 lg:p-14 rounded-[3.5rem] border border-white/5">
               <p className="text-primary font-black text-5xl lg:text-7xl mb-4">0%</p>
               <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Failure Rate in Detected Emergencies</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portfolio / Solutions Row */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&q=80&w=800" className="w-full rounded-[4rem] shadow-2xl" alt="Firefighters" />
            <div className="absolute -bottom-10 -right-10 bg-primary p-12 rounded-[4rem] text-white shadow-3xl hidden xl:block animate-bounce-subtle">
               <Star size={40} fill="white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
               <div className="w-2 h-2 bg-primary rounded-full" />
               <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">EXPERT SOLUTIONS</span>
            </div>
            <h2 className="text-4xl lg:text-7xl font-black text-accent leading-[1.1] mb-10">Delivering comprehensive fire safety solutions</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Part Time Expert Hire", desc: "Expert fire officers for residential surveillance." },
                { title: "Get Live Demo Session", desc: "Watch our systems in action before project start." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6"><CheckCircle2 size={24} /></div>
                  <h4 className="text-xl font-black mb-3">{item.title}</h4>
                  <p className="text-xs text-accent/40 font-bold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-t border-accent/5">
           {[
             { val: "25+", label: "Award Winning" },
             { val: "150K+", label: "Job Done Successfully" },
             { val: "30+", label: "Certified Engineers" },
             { val: "3K+", label: "Service Locations" }
           ].map((stat, i) => (
             <div key={i} className="text-center group">
               <p className="text-4xl lg:text-6xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">{stat.val}</p>
               <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-accent/40">{stat.label}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 5. FAQ Section (matches home) */}
      <FAQ data={content.faqs} />

      {/* 6. Unmatched Security Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto mb-20 lg:mb-32">
        <div className="text-center mb-16 lg:mb-24">
           <div className="flex items-center justify-center gap-2 mb-6 text-primary font-bold tracking-widest uppercase text-xs">HOW WE PROTECT YOU</div>
           <h2 className="text-4xl lg:text-7xl font-black text-accent leading-[1.1]">Delivering unmatched security through dedication</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
           {[
             { id: '01', title: "Consultation", highlight: false },
             { id: '02', title: "System Design", highlight: true },
             { id: '03', title: "Installation", highlight: false },
             { id: '04', title: "Support", highlight: false },
           ].map((step, i) => (
             <div key={i} className={`p-10 lg:p-14 rounded-[3rem] lg:rounded-[4rem] flex flex-col gap-10 transition-all duration-500 ${
               step.highlight ? 'bg-primary text-white shadow-2xl shadow-primary/30' : 'bg-white text-accent hover:shadow-xl'
             }`}>
               <span className="text-xl font-black opacity-20">{step.id}</span>
               <div>
                 <h4 className="text-2xl font-black mb-4">{step.title}</h4>
                 <p className={`text-xs font-bold leading-relaxed ${step.highlight ? 'text-white/60' : 'text-accent/30'}`}>Providing professional consultancy and thorough assessment for your assets.</p>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="pb-20 lg:pb-32 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1600px] mx-auto bg-primary text-white rounded-[3rem] lg:rounded-[5rem] p-12 lg:p-24 flex flex-col lg:flex-row justify-between items-center gap-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-bl-full translate-x-12 -translate-y-12" />
          <div className="text-center lg:text-left relative z-10">
            <h3 className="text-3xl lg:text-6xl font-black mb-4">Request for a free fire safety audit</h3>
            <p className="text-white/80 font-medium lg:text-xl">Our experts will visit your site and provide a comprehensive report.</p>
          </div>
          <button className="bg-[#2D1E16] text-white px-10 py-6 rounded-full font-black flex items-center gap-4 hover:scale-105 transition-all shadow-3xl text-sm lg:text-lg uppercase tracking-widest relative z-10">
             <PhoneCall size={24} /> +61 8 0000 000
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
