import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import { getContent } from '../api/contentService';

const CertificationsPage = () => {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetchCerts = async () => {
      const data = await getContent('certs');
      if (data && Array.isArray(data)) setCerts(data);
    };
    fetchCerts();
  }, []);

  return (
    <div className="pt-48 bg-[#FEF3E2] min-h-screen">
      <section className="px-4 sm:px-6 lg:px-10 mb-20">
        <div className="max-w-[1600px] mx-auto bg-[#2D1E16] rounded-[3rem] lg:rounded-[5rem] py-20 lg:py-32 px-10 sm:px-20 text-center shadow-2xl ">
          <h1 className="text-5xl lg:text-8xl font-black text-white mb-6">Certifications</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs lg:text-sm">Verified Excellence</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {Array.isArray(certs) && certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-[3rem] flex items-center gap-8 shadow-sm hover:shadow-xl transition-all border border-primary/5"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shrink-0">
                <Award size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-accent mb-2">{cert.title}</h3>
                <p className="text-xs font-bold text-accent/40 uppercase tracking-widest mb-2">{cert.issuer}</p>
                <p className="flex items-center gap-2 text-primary text-xs font-black uppercase"><CheckCircle size={14} /> {cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CertificationsPage;
