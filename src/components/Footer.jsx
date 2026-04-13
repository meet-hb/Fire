import React from 'react';
import { Flame, Send, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6';

const Footer = ({ data }) => {
  return (
    <footer className="bg-[#1C1510] text-white pt-20 lg:pt-32 pb-12 lg:pb-16 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-primary/10 blur-[80px] lg:blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 lg:mb-24">
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-8 lg:mb-10">
                {data?.logo && (data.logo.startsWith('http') || data.logo.startsWith('/')) ? (
                  <img src={data.logo} alt="Logo" className="h-10 w-auto object-contain transition-transform" />
                ) : (
                  <>
                    <div className="bg-primary p-2 rounded-xl">
                      <Flame className="text-white w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <span className="text-2xl lg:text-3xl font-black tracking-tighter uppercase italic">
                      {data?.logo || 'WELDOSELD'}
                    </span>
                  </>
                )}
              </div>
              <p className="text-white/40 leading-relaxed mb-8 lg:mb-10 text-sm font-medium max-w-sm mx-auto sm:mx-0">
                {data?.description || 'Premium fire protection solutions for industrial and residential assets.'}
              </p>
             <div className="flex justify-center sm:justify-start gap-4">
               {[
                 { Icon: FaFacebook, link: data?.socials?.facebook },
                 { Icon: FaTwitter, link: data?.socials?.twitter },
                 { Icon: FaLinkedin, link: data?.socials?.linkedin },
                 { Icon: FaInstagram, link: data?.socials?.instagram }
               ].map(({ Icon, link }, i) => (
                 <a key={i} href={link || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all group shadow-xl">
                   <Icon size={18} className="lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
                 </a>
               ))}
             </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg lg:text-xl font-black mb-8 lg:mb-10 text-white flex items-center justify-center sm:justify-start gap-2">
              <span className="w-6 h-[2px] bg-primary"></span>
              Our Services
            </h4>
            <ul className="space-y-4 lg:space-y-5">
              {Array.isArray(data?.links?.services) && data.links.services.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/40 hover:text-primary transition-all flex items-center justify-center sm:justify-start gap-2 group text-sm font-bold">
                    <span className="hidden sm:block w-0 h-[1px] bg-primary group-hover:w-4 transition-all"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg lg:text-xl font-black mb-8 lg:mb-10 text-white flex items-center justify-center sm:justify-start gap-2">
              <span className="w-6 h-[2px] bg-primary"></span>
              Contact Info
            </h4>
            <div className="space-y-5 lg:space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                  <MapPin size={18} />
                </div>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-medium">{data?.contact?.address}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                  <Phone size={18} />
                </div>
                <p className="text-white/50 text-xs sm:text-sm font-bold">{data?.contact?.phone}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                  <Mail size={18} />
                </div>
                <p className="text-white/50 text-xs sm:text-sm font-bold break-all">{data?.contact?.email}</p>
              </div>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg lg:text-xl font-black mb-8 lg:mb-10 text-white flex items-center justify-center sm:justify-start gap-2">
              <span className="w-6 h-[2px] bg-primary"></span>
              {data?.newsletter?.heading || "Join Newsletter"}
            </h4>
            <p className="text-white/40 mb-8 text-sm font-medium">{data?.newsletter?.text || "Get the latest updates and professional safety tips."}</p>
            <div className="relative max-w-sm mx-auto sm:mx-0">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/5 rounded-2xl px-6 py-4 lg:py-5 w-full focus:outline-none focus:border-primary transition-all text-xs lg:text-sm font-medium placeholder:text-white/20 shadow-inner"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-4 lg:px-5 rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center shadow-lg shadow-primary/20 group">
                 <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 lg:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-8 text-center md:text-left">
          <p className="text-white/20 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 Trustsafe. Engineered for ultimate protection.</p>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            <a href="#" className="text-white/20 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/20 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors">Term of Services</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

