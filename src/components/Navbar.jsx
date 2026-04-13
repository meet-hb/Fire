import React, { useState } from 'react';
import { Flame, Phone, Mail, MapPin, Search, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { FaInstagram, FaFacebook, FaGlobe } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const productLinks = [
    { title: "Fire Alarms", path: "/products/alarms" },
    { title: "Fire Extinguishers", path: "/products/extinguishers" },
    { title: "Sprinkler Systems", path: "/products/sprinklers" },
    { title: "Safety Gear", path: "/products/gear" }
  ];

  const homeLinks = [
    { title: "Home Design 1", path: "/home-1" },
    { title: "Home Design 2", path: "/home-2" },
    { title: "Home Design 3", path: "/home-3" }
  ];

  const handleLinkClick = (link) => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - Contact Info */}
      <div className="bg-primary text-white py-2 px-4 sm:px-10 hidden md:block">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center space-x-8">
            <span className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <Phone size={14} fill="white" /> {data?.topBar?.phone || 'Loading...'}
            </span>
            <span className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <Mail size={14} fill="white" /> {data?.topBar?.email || ''}
            </span>
            <span className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <MapPin size={14} fill="white" /> {data?.topBar?.address || ''}
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity"><FaFacebook size={16} /></a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity"><FaInstagram size={16} /></a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity"><FaGlobe size={16} /></a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1700px] mx-auto mt-0 lg:mt-4 px-4 sm:px-6">
        <nav className="bg-white px-6 lg:px-10 py-5 shadow-2xl rounded-[1.5rem] lg:rounded-[2.5rem] flex items-center justify-between border border-primary/5">
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            {data?.logo && (data.logo.startsWith('http') || data.logo.startsWith('/')) ? (
              <img src={data.logo} alt="Logo" className="h-10 lg:h-12 w-auto object-contain transition-transform group-hover:scale-105" />
            ) : (
              <>
                <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                  <Flame className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-[#2D1E16] tracking-tighter uppercase italic">
                  {data?.logo || 'Firegard'}<span className="text-primary not-italic">.</span>
                </span>
              </>
            )}
          </Link>

          {/* Desktop Links (Large Density) */}
          <div className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
            {Array.isArray(data?.links) && data.links.map((link) => (
              <div key={link} className="relative group">
                {link === 'Home' ? (
                  <div
                    onMouseEnter={() => setActiveDropdown('Home')}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="relative"
                  >
                    <Link
                      to="/"
                      className="text-[#2D1E16]/80 hover:text-primary transition-all font-black text-[11px] 2xl:text-xs uppercase tracking-widest flex items-center gap-1.5 py-2"
                    >
                      {link}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'Home' ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Home Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === 'Home' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 bg-white shadow-2xl rounded-2xl p-4 min-w-[200px] border border-primary/5 mt-2 overflow-hidden"
                        >
                          {homeLinks.map((sub) => (
                            <Link
                              key={sub.title}
                              to={sub.path}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-3 text-[10px] font-black text-[#2D1E16]/60 hover:text-primary hover:bg-primary/5 rounded-xl transition-all uppercase tracking-widest border-b border-primary/5 last:border-0"
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : link === 'Products' ? (
                  <div
                    onMouseEnter={() => setActiveDropdown('Products')}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="relative"
                  >
                    <button
                      className="text-[#2D1E16]/80 hover:text-primary transition-all font-black text-[11px] 2xl:text-xs uppercase tracking-widest flex items-center gap-1.5 py-2"
                    >
                      {link}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'Products' ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === 'Products' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 bg-white shadow-2xl rounded-2xl p-4 min-w-[200px] border border-primary/5 mt-2"
                        >
                          {productLinks.map((sub) => (
                            <Link
                              key={sub.title}
                              to={sub.path}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-3 text-[10px] font-black text-[#2D1E16]/60 hover:text-primary hover:bg-primary/5 rounded-xl transition-all uppercase tracking-widest border-b border-primary/5 last:border-0"
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link 
                    to={
                      link === 'About' ? '/about' : 
                      link === 'Brands' ? '/brands' :
                      link === 'Products' ? '/products' :
                      link === 'Videos' ? '/videos' :
                      link === 'Gallery' ? '/gallery' :
                      link === 'Certifications' ? '/certifications' :
                      link === 'Clients' ? '/clients' :
                      link === 'Contact' ? '/contact' :
                      `/#${link.toLowerCase().replace(' ', '-')}`
                    } 
                    className="text-[#2D1E16]/80 hover:text-primary transition-all font-black text-[11px] 2xl:text-xs uppercase tracking-widest py-2 flex items-center gap-1 group/link"
                  >
                    {link}
                    <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 scale-0 group-hover/link:opacity-100 group-hover/link:scale-100 transition-all" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="text-[#2D1E16] hover:text-primary transition-colors hidden sm:block">
              <Search size={22} />
            </button>
            <Link to="/contact" className="hidden lg:flex bg-primary text-white px-8 py-4 rounded-full font-black items-center gap-3 shadow-xl shadow-primary/20 uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all">
              ENQUIRY <ArrowRight size={18} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="xl:hidden bg-primary/5 p-3 rounded-2xl text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-[#2D1E16]/40 backdrop-blur-md z-[51]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[52] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-gray-50">
                <span className="text-xl font-black text-accent uppercase tracking-tighter">Navigation</span>
                <button onClick={() => setIsMenuOpen(false)} className="bg-primary/10 p-3 rounded-2xl text-primary">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-4">
                {Array.isArray(data?.links) && data.links.map((link) => (
                  <div key={link}>
                    {link === 'Products' || link === 'Home' ? (
                      <div className="space-y-2">
                        <button 
                          onClick={() => setMobileDropdown(mobileDropdown === link ? null : link)}
                          className="w-full text-accent font-black uppercase tracking-[0.2em] text-xs py-4 flex justify-between items-center border-b border-gray-50 group"
                        >
                          {link} 
                          <ChevronDown 
                            size={14} 
                            className={`text-primary transition-transform duration-300 ${mobileDropdown === link ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        <AnimatePresence>
                          {mobileDropdown === link && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-4 space-y-1 overflow-hidden"
                            >
                              {(link === 'Products' ? productLinks : homeLinks).map(sub => (
                                <Link 
                                  key={sub.title} 
                                  to={sub.path} 
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setMobileDropdown(null);
                                  }} 
                                  className="block py-4 text-[10px] font-bold text-accent/40 uppercase tracking-widest hover:text-primary transition-all flex items-center justify-between group/sub"
                                >
                                  {sub.title}
                                  <ArrowRight size={10} className="opacity-0 group-hover/sub:opacity-100 transition-all -translate-x-2 group-hover/sub:translate-x-0" />
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={
                          link === 'Home' ? '/' : 
                          link === 'About' ? '/about' : 
                          link === 'Brands' ? '/brands' :
                          link === 'Products' ? '/products' :
                          link === 'Videos' ? '/videos' :
                          link === 'Gallery' ? '/gallery' :
                          link === 'Certifications' ? '/certifications' :
                          link === 'Clients' ? '/clients' :
                          link === 'Contact' ? '/contact' :
                          `/#${link.toLowerCase().replace(' ', '-')}`
                        }
                        onClick={() => setIsMenuOpen(false)}
                        className="text-accent font-black uppercase tracking-[0.2em] text-xs hover:text-primary py-4 border-b border-gray-50 flex justify-between items-center"
                      >
                        {link}
                        <ArrowRight size={14} className="text-primary" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-8 bg-gray-50">
                <button className="w-full bg-primary text-white px-8 py-5 rounded-3xl font-black flex items-center justify-center gap-4 shadow-xl shadow-primary/30 uppercase text-xs tracking-widest">
                  Contact Now <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
