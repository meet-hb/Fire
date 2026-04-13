import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';

const ContactPage = () => {
   return (
      <div className="pt-48 bg-[#FEF3E2] min-h-screen">
         <section className="px-4 sm:px-6 lg:px-10 mb-20">
            <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5rem] py-20 lg:py-32 px-10 sm:px-20 text-center shadow-2xl ">
               <h1 className="text-5xl lg:text-8xl font-black text-white mb-6">Contact Us</h1>
               <p className="text-white/40 font-bold uppercase tracking-widest text-xs lg:text-sm">We are Here to Help</p>
            </div>
         </section>

         <section className="px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto py-20">
            <div className="grid lg:grid-cols-3 gap-10">
               {/* Info Cards */}
               <div className="lg:col-span-1 flex flex-col gap-6">
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm flex items-center gap-6 group hover:bg-primary transition-all duration-500 hover:scale-105">
                     <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white group-hover:text-primary"><Phone size={24} /></div>
                     <div>
                        <p className="text-xs font-bold text-accent/40 group-hover:text-white/60 mb-1 uppercase tracking-widest">Call Us</p>
                        <p className="text-xl font-black text-accent group-hover:text-white">+61 8 0000 000</p>
                     </div>
                  </div>
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm flex items-center gap-6 group hover:bg-primary transition-all duration-500 hover:scale-105">
                     <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white group-hover:text-primary"><Mail size={24} /></div>
                     <div>
                        <p className="text-xs font-bold text-accent/40 group-hover:text-white/60 mb-1 uppercase tracking-widest">Email Us</p>
                        <p className="text-xl font-black text-accent group-hover:text-white">info@trustsafe.com</p>
                     </div>
                  </div>
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm flex items-center gap-6 group hover:bg-primary transition-all duration-500 hover:scale-105">
                     <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white group-hover:text-primary"><Clock size={24} /></div>
                     <div>
                        <p className="text-xs font-bold text-accent/40 group-hover:text-white/60 mb-1 uppercase tracking-widest">Open Hours</p>
                        <p className="text-xl font-black text-accent group-hover:text-white">Mon - Sat: 9am - 7pm</p>
                     </div>
                  </div>
               </div>

               {/* Contact Form */}
               <div className="lg:col-span-2 bg-white rounded-[4rem] p-12 lg:p-20 shadow-xl border border-primary/5">
                  <h2 className="text-3xl lg:text-5xl font-black text-accent mb-12">Get in touch with us</h2>
                  <form className="grid sm:grid-cols-2 gap-8">
                     <div className="flex flex-col gap-3">
                        <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Your Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-[#FEF3E2] rounded-full px-8 py-5 text-accent font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all" />
                     </div>
                     <div className="flex flex-col gap-3">
                        <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Email Address</label>
                        <input type="email" placeholder="john@example.com" className="w-full bg-[#FEF3E2] rounded-full px-8 py-5 text-accent font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all" />
                     </div>
                     <div className="flex flex-col gap-3 sm:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Message</label>
                        <textarea rows={5} placeholder="How can we help you?" className="w-full bg-[#FEF3E2] rounded-[2rem] px-8 py-6 text-accent font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all resize-none"></textarea>
                     </div>
                     <div className="sm:col-span-2 pt-4">
                        <button className="bg-primary text-white px-12 py-6 rounded-full font-black flex items-center gap-4 hover:scale-105 transition-all shadow-xl shadow-primary/20 uppercase text-sm tracking-widest">
                           Send Message <Send size={20} />
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </section>
      </div>
   );
};

export default ContactPage;
