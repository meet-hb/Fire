import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Globe, Users, Award, PlayCircle, Star, PhoneCall } from 'lucide-react';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import { content } from '../data/content';

const AboutPage = () => {
  return (
    <div className="pt-48 bg-[#FEF3E2]">
      {/* 1. Header Hero Banner */}
      <section className="px-4 sm:px-6 lg:px-10 mb-12 lg:mb-20">
        <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5rem] py-20 lg:py-32 px-10 sm:px-20 relative overflow-hidden text-center lg:text-left shadow-2xl">
          <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
          <h1 className="text-5xl lg:text-8xl font-black text-white mb-6 relative z-10">About Us</h1>
          <nav className="flex items-center justify-center lg:justify-start gap-4 text-white/40 font-bold uppercase tracking-widest text-xs lg:text-sm relative z-10">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="w-4 h-[2px] bg-white/10" />
            <span className="text-white">About Us</span>
          </nav>
        </div>
      </section>

      {/* 2. Main About Section (Enhanced) */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="rounded-[3rem] overflow-hidden shadow-2xl"
             >
               <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800" alt="Main Fire" className="w-full" />
             </motion.div>
             <div className="absolute top-10 left-[-40px] bg-primary p-8 rounded-3xl text-white shadow-2xl hidden md:block">
               <Award size={40} className="mb-2" />
               <p className="font-black text-xl">30+ Years</p>
               <p className="text-[10px] font-bold uppercase tracking-widest">Experience</p>
             </div>
             <div className="absolute -bottom-10 -right-10 w-[250px] rounded-3xl overflow-hidden border-8 border-[#FEF3E2] shadow-2xl hidden md:block">
               <img src="https://images.unsplash.com/photo-1599059021644-80252390a424?auto=format&fit=crop&q=80&w=400" alt="Safety" />
             </div>
          </div>
          <div>
             <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">ABOUT OUR COMPANY</span>
             </div>
             <h2 className="text-4xl lg:text-6xl font-black text-accent leading-[1.1] mb-8">Expert guidance and personal coaching</h2>
             <p className="text-accent/60 mb-10 font-medium leading-relaxed">We provide specialized consultancy and on-site engineering to ensure your property meets the highest global fire safety standards.</p>
             <div className="space-y-4 mb-10">
               <p className="flex items-center gap-3 font-black text-accent"><CheckCircle2 className="text-primary" size={20} /> Professional Fire Audits</p>
               <p className="flex items-center gap-3 font-black text-accent"><CheckCircle2 className="text-primary" size={20} /> 24/7 Monitoring Systems</p>
             </div>
             <div className="bg-white p-6 rounded-3xl flex items-center gap-6 shadow-sm border border-primary/5">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />)}
                </div>
                <div>
                   <p className="font-black text-xl">5000+ Clients</p>
                   <p className="text-xs text-primary font-bold uppercase tracking-widest">Satisfied Worldwide</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Innovative Solutions (Feature Row) */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1600px] mx-auto bg-white/40 rounded-[3rem] lg:rounded-[5rem] p-12 lg:p-24">
           <div className="grid lg:grid-cols-2 gap-10 items-end mb-16 lg:mb-20">
             <h2 className="text-4xl lg:text-6xl font-black text-accent leading-[1.1]">Innovative solutions for maximum security</h2>
             <p className="text-accent/40 font-bold max-w-sm lg:ml-auto">Developing cutting-edge fire protection strategies for the modern built environment.</p>
           </div>
           <div className="grid md:grid-cols-3 gap-10">
             {[
               { icon: Shield, title: "Active Protection", desc: "Automated systems that react instantly to heat and smoke." },
               { icon: Globe, title: "Global Standards", desc: "Compliance with NFPA and international safety protocols." },
               { icon: Users, title: "Expert Training", desc: "Empowering your staff with life-saving knowledge and skills." }
             ].map((item, i) => (
               <div key={i} className="flex flex-col gap-6">
                 <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20"><item.icon size={32} /></div>
                 <h4 className="text-2xl font-black text-accent">{item.title}</h4>
                 <p className="text-sm font-bold text-accent/40 leading-relaxed">{item.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 4. Statistics Row */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
         <div className="grid lg:grid-cols-2 gap-20 items-end mb-20">
           <h2 className="text-4xl lg:text-6xl font-black text-accent">Delivering reliable and customized solutions</h2>
           <p className="text-accent/60 font-medium max-w-lg lg:ml-auto">We use advanced analytics to predict fire risks and deploy countermeasures proactively.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           {[
             { val: "47B+", label: "Assets Protected Globally", icon: Shield },
             { val: "90%+", label: "Compliance Rate Observed", icon: Globe },
             { val: "30%", label: "Faster Response Times", icon: ArrowRight }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-12 lg:p-16 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group">
               <stat.icon className="text-primary mb-6" size={48} />
               <p className="text-5xl lg:text-7xl font-black text-primary mb-4 group-hover:scale-105 transition-transform">{stat.val}</p>
               <p className="text-xs font-bold text-accent/40 uppercase tracking-widest">{stat.label}</p>
             </div>
           ))}
         </div>
         <div className="relative h-[400px] lg:h-[600px] rounded-[3rem] lg:rounded-[5rem] overflow-hidden group shadow-2xl">
            <img src="https://images.unsplash.com/photo-1542353436-312f0ee9429b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Video Placeholder" />
            <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
               <button className="text-white hover:text-primary transition-colors hover:scale-110 duration-500">
                  <PlayCircle size={100} strokeWidth={1} />
               </button>
            </div>
         </div>
      </section>

      {/* 5. Dark Experience Section */}
      <section className="px-4 sm:px-6 lg:px-10 mb-20 lg:mb-32">
        <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5.5rem] grid lg:grid-cols-2 gap-20 items-center p-12 lg:p-24 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-br-full" />
          <div className="text-white">
             <div className="flex items-center gap-3 mb-8">
               <div className="w-2 h-2 bg-primary rounded-full" />
               <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">WHY TRUST US</span>
             </div>
             <h2 className="text-4xl lg:text-7xl font-black leading-[1.1] mb-10">Decades of experience and specialized expertise</h2>
             <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="flex items-center gap-4">
                  <div className="bg-primary p-3 rounded-2xl"><Shield size={24} /></div>
                  <p className="font-black text-xl">Top Rated<br/><span className="text-xs text-white/40 uppercase">Protection</span></p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="bg-primary p-3 rounded-2xl"><Award size={24} /></div>
                   <p className="font-black text-xl">Certified<br/><span className="text-xs text-white/40 uppercase">Engineers</span></p>
                </div>
             </div>
             <ul className="space-y-4 mb-12">
               {['Compliance check audits', 'Risk management plan', 'Emergency training scripts'].map(li => (
                 <li key={li} className="flex items-center gap-3 text-white/60 font-medium"><CheckCircle2 size={18} className="text-primary" /> {li}</li>
               ))}
             </ul>
             <button className="bg-primary text-white px-10 py-5 rounded-full font-black flex items-center gap-4 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 uppercase text-xs tracking-widest">
                Learn More <ArrowRight size={20} />
             </button>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=800" className="w-full h-auto rounded-[4rem] drop-shadow-3xl" alt="Expert" />
            <div className="absolute top-10 right-10 bg-white p-6 rounded-3xl text-accent shadow-2xl animate-bounce-subtle">
               <Star size={32} fill="#F26522" className="text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Team Section */}
      <Team data={content.team} />

      {/* 7. Commitment Grid */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs block mb-6">OUR COMMITMENT</span>
            <h2 className="text-4xl lg:text-7xl font-black text-accent leading-[1.1] mb-10">Our commitment to level in every feature we provide</h2>
            <div className="space-y-8">
               {[
                 { title: "Smart Fire Alarms", sub: "Integrated smoke and thermal detection." },
                 { title: "Modern Sprinklers", sub: "High-pressure fog suppression technology." },
                 { title: "Exit Automation", sub: "Automatic door release during safety trips." }
               ].map((c, i) => (
                 <div key={i} className="flex gap-6 items-start group">
                   <div className="text-primary font-black text-3xl mt-1 opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                   <div>
                     <h4 className="text-2xl font-black text-accent mb-2">{c.title}</h4>
                     <p className="text-accent/40 font-bold leading-relaxed">{c.sub}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 relative">
             <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 border-8 border-[#FEF3E2] shadow-xl">
               <Award size={32} />
             </div>
             <img src="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?w=400&h=400&fit=crop" className="rounded-[2.5rem] shadow-xl" />
             <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop" className="rounded-[2.5rem] mt-12 shadow-xl" />
             <img src="https://images.unsplash.com/photo-1542353436-312f0ee9429b?w=400&h=400&fit=crop" className="rounded-[2.5rem] -mt-12 shadow-xl" />
             <img src="https://images.unsplash.com/photo-1518005020251-58296d8f51f0?w=400&h=400&fit=crop" className="rounded-[2.5rem] shadow-xl" />
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <FAQ data={content.faqs} />
    </div>
  );
};

export default AboutPage;
