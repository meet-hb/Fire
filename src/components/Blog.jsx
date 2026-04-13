import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';

const posts = [
  {
    title: "How to prevent fire in high-rise buildings and smart complex systems",
    category: "Safety Protocols",
    date: "April 10, 2026",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1542353436-312f0ee9429b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Top 10 fire extinguishers for home use in 2026",
    category: "Equipment",
    date: "April 08, 2026",
    author: "Safety Pro",
    image: "https://images.unsplash.com/photo-1582633005035-7c014605963a?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Emergency response protocols for industrial units",
    category: "Management",
    date: "April 05, 2026",
    author: "Inspector",
    image: "https://images.unsplash.com/photo-1562942354-937748880e6d?auto=format&fit=crop&q=80&w=400"
  }
];

const Blog = () => {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 px-4 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6 text-primary font-bold tracking-widest uppercase text-xs sm:text-sm">
              <span className="w-8 md:w-10 h-[2px] bg-primary"></span>
              LATEST UPDATES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-accent leading-[1.2] lg:leading-[1.1]">
              Explore our latest <span className="text-primary italic">blog & news</span>
            </h2>
          </div>
          <button className="hidden sm:flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 text-xs uppercase tracking-widest">
            View All Blogs <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 px-4">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group bg-white rounded-[3rem] overflow-hidden border border-primary/5 hover:border-primary/20 hover:shadow-[0_40px_80px_-15px_rgba(242,101,34,0.15)] transition-all duration-500"
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={post.title} 
                />
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-primary text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-lg">
                  {post.category}
                </div>
              </div>
              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-4 sm:gap-6 mb-4 text-accent/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User size={12} className="text-primary" /> {post.author}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-accent mb-6 sm:mb-8 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <a href="#" className="inline-flex items-center gap-2 text-primary font-bold uppercase text-[9px] sm:text-[10px] tracking-[0.2em] group-hover:gap-4 transition-all border-b-2 border-primary/10 pb-1">
                  Read Full Article <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden px-4">
          <button className="w-full bg-primary text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/30 uppercase text-xs tracking-widest">
            View All Blogs <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;


