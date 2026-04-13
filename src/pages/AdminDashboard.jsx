import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Layout, FileText, Globe, Video, Image as ImageIcon, 
  Award, Clock, Users, LogOut, Save, Search, Bell, Menu, X, Plus,
  ChevronRight, ArrowUpRight, Flame, Shield, Activity, Settings, 
  Trash2, Edit3, Smartphone, Laptop, Tablet, Box, Upload
} from 'lucide-react';
import { getContent, updateContent } from '../api/contentService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'navigation', label: 'Navigation', icon: Layout },
    { id: 'hero', label: 'Hero Banner', icon: FileText },
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'features', label: 'Features', icon: Layout },
    { id: 'services', label: 'Services', icon: Shield },
    { id: 'videos', label: 'Video Center', icon: Video },
    { id: 'gallery', label: 'Media Gallery', icon: ImageIcon },
    { id: 'certs', label: 'Certifications', icon: Award },
    { id: 'clients', label: 'Client Stats', icon: Users },
    { id: 'footer', label: 'Footer Settings', icon: Globe },
  ];

  // Fetch data when activeTab changes
  useEffect(() => {
    if (activeTab === 'overview') return;
    const fetchData = async () => {
      setLoading(true);
      const res = await getContent(activeTab);
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [activeTab]);

  const handleUpdate = async () => {
    setSaving(true);
    const res = await updateContent(activeTab, data);
    setSaving(false);
    if (res.success) {
      setMessage('Update successful!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(`Error: ${res.error}`);
    }
  };

  const handleChange = (field, value, path = []) => {
    setData(prev => {
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
      current[field] = value;
      return newData;
    });
  };

  const handleArrayUpdate = (index, field, value, arrayField = null) => {
    setData(prev => {
      const newData = { ...prev };
      if (Array.isArray(prev)) {
        const arr = [...prev];
        arr[index][field] = value;
        return arr;
      } else if (arrayField && Array.isArray(prev[arrayField])) {
        const arr = [...prev[arrayField]];
        arr[index][field] = value;
        newData[arrayField] = arr;
        return newData;
      } else if (Array.isArray(prev.items)) {
         const arr = [...prev.items];
         arr[index][field] = value;
         newData.items = arr;
         return newData;
      }
      return prev;
    });
  };

  const handleAddNew = () => {
    let newItem = {};
    if (activeTab === 'features') newItem = { title: 'New Feature', description: '', image: '' };
    if (activeTab === 'services') newItem = { title: 'New Service', description: '', icon: '' };
    if (activeTab === 'brands') newItem = { image: '' };
    if (activeTab === 'videos') newItem = { title: 'New Video', url: '' };
    if (activeTab === 'certs') newItem = { title: 'New Cert', issuer: '', date: '' };
    if (activeTab === 'clients') newItem = { label: 'New Metric', value: '' };

    setData(prev => {
      if (Array.isArray(prev)) return [...prev, newItem];
      const items = Array.isArray(prev?.items) ? prev.items : [];
      return { ...prev, items: [...items, newItem] };
    });
  };

  const handleRemoveItem = (index) => {
    setData(prev => {
      if (Array.isArray(prev)) return prev.filter((_, i) => i !== index);
      if (!Array.isArray(prev?.items)) return prev;
      return { ...prev, items: prev.items.filter((_, i) => i !== index) };
    });
  };

  const handleImageUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setSaving(true);
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.url) {
        callback(result.url);
        setMessage('Image uploaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('Upload failed. Check console.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans text-slate-800">
      {/* 🚀 Sleek Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 288 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="fixed inset-y-0 left-0 bg-[#1A1A1A] text-white z-50 flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-8 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Flame size={24} className="text-white" />
          </div>
          <span className="text-xl font-black uppercase tracking-tighter italic whitespace-nowrap">Admin Control</span>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-4 px-4">Management Modules</p>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
                activeTab === item.id 
                ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'group-hover:text-primary transition-colors'} />
                <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 text-red-400 font-bold hover:bg-white/10 transition-all text-sm group">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* 🖥️ Main Dashboard Container */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:pl-72' : ''}`}>
        
        {/* Top Professional Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary transition-all active:scale-90"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="ml-4">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Dashboard Status</h3>
               <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-sm font-bold text-slate-900">Live Sync Active</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
               <div className="flex flex-col items-center gap-0.5">
                  <Laptop size={16} className="text-primary" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">Desktop</span>
               </div>
               <div className="w-px h-6 bg-slate-200" />
               <div className="flex flex-col items-center gap-0.5 opacity-30">
                  <Smartphone size={16} />
                  <span className="text-[10px] font-black uppercase">Mobile</span>
               </div>
            </div>
            <a 
              href="/" 
              target="_blank" 
              className="hidden lg:flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl text-slate-600 font-black text-xs uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-all shadow-sm"
            >
              View Website <ArrowUpRight size={14} />
            </a>
            <button 
              onClick={() => {
                localStorage.removeItem('isAdminAuthenticated');
                window.location.reload();
              }}
              className="p-3.5 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-500/5 group flex items-center gap-2 px-6"
            >
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Logout</span>
              <X size={20} />
            </button>
            <button className="p-3.5 rounded-2xl bg-[#1A1A1A] text-white shadow-xl shadow-black/10 hover:scale-105 transition-all">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 lg:p-12 bg-[#F8F9FA] min-h-[calc(100vh-96px)]">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Header Title Section */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight capitalize">{activeTab.replace(/([A-Z])/g, ' $1')} Module</h1>
                <p className="text-slate-500 font-medium text-lg mt-2 font-serif italic">Editing live content for Firegard infrastructure.</p>
              </div>
              {activeTab !== 'overview' && (
                <div className="flex gap-4">
                   <button 
                    onClick={handleUpdate}
                    disabled={saving}
                    className="bg-primary text-white px-10 py-5 rounded-3xl font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-3 uppercase tracking-widest"
                  >
                    {saving ? <Activity className="animate-spin" size={20} /> : <Save size={20} />} 
                    {saving ? 'Saving...' : 'Publish Update'}
                  </button>
                </div>
              )}
            </div>

            {message && (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-primary text-white p-6 rounded-[2rem] mb-12 font-black text-center shadow-2xl shadow-primary/20 uppercase tracking-widest text-sm">
                  {message}
               </motion.div>
            )}

            {loading ? (
              <div className="h-96 flex flex-col items-center justify-center gap-4">
                <Activity size={48} className="text-primary animate-spin" />
                <p className="text-accent/30 font-black uppercase tracking-widest text-xs">Synchronizing PostgreSQL Data...</p>
              </div>
            ) : !data && activeTab !== 'overview' ? (
              <div className="h-96 bg-white rounded-[4rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12">
                 <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mb-6">
                    <Shield size={40} />
                 </div>
                 <h3 className="text-xl font-black text-slate-900 mb-2">No Data Found in Database</h3>
                 <p className="max-w-xs text-slate-400 font-medium text-sm leading-relaxed mb-8">It seems your PostgreSQL database tables are empty or the backend server is not reachable.</p>
                 <div className="flex gap-4">
                    <button onClick={() => window.location.reload()} className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Retry Connection</button>
                    <a href="http://localhost:5000/api/setup" target="_blank" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Run Setup Script</a>
                 </div>
              </div>
            ) : (
              <div className="space-y-10">
                {activeTab === 'overview' && <OverviewView />}
                
                {activeTab === 'navigation' && data && (
                   <SectionCard title="Navigation & Branding">
                      <div className="space-y-10">
                         <ImageUploadField 
                            label="Site Logo (Text or Image URL)" 
                            value={data.logo} 
                            onChange={v => handleChange('logo', v)} 
                            onUpload={(e) => handleImageUpload(e, (url) => handleChange('logo', url))}
                         />
                         <div className="grid md:grid-cols-2 gap-10">
                            <InputField label="Phone Number" value={data.topBar?.phone} onChange={v => handleChange('phone', v, ['topBar'])} />
                            <InputField label="Email Address" value={data.topBar?.email} onChange={v => handleChange('email', v, ['topBar'])} />
                            <InputField label="Physical Address" value={data.topBar?.address} onChange={v => handleChange('address', v, ['topBar'])} />
                         </div>
                      </div>
                   </SectionCard>
                )}

                {activeTab === 'hero' && data && (
                  <SectionCard title="Hero Banner Configuration">
                     <div className="space-y-10">
                        <InputField label="Banner Tagline" value={data.tagline} onChange={v => handleChange('tagline', v)} />
                        <TextAreaField label="Main Campaign Heading" value={data.title} onChange={v => handleChange('title', v)} />
                        <TextAreaField label="Description Text" value={data.description} onChange={v => handleChange('description', v)} rows={3} />
                        <ImageUploadField 
                          label="Background Image URL" 
                          value={data.image} 
                          onChange={v => handleChange('image', v)} 
                          onUpload={(e) => handleImageUpload(e, (url) => handleChange('image', url))}
                        />
                     </div>
                  </SectionCard>
                )}

                 {activeTab === 'about' && data && (
                    <SectionCard title="About Us Content">
                       <div className="space-y-10">
                          <div className="grid md:grid-cols-2 gap-10">
                             <ImageUploadField 
                               label="Main About Image" 
                               value={data.image} 
                               onChange={v => handleChange('image', v)} 
                               onUpload={(e) => handleImageUpload(e, (url) => handleChange('image', url))}
                             />
                             <ImageUploadField 
                               label="Secondary Decorative Image" 
                               value={data.image2} 
                               onChange={v => handleChange('image2', v)} 
                               onUpload={(e) => handleImageUpload(e, (url) => handleChange('image2', url))}
                             />
                          </div>
                          <div className="grid md:grid-cols-2 gap-10">
                             <InputField label="Main Heading" value={data.title} onChange={v => handleChange('title', v)} />
                             <InputField label="Sub-heading" value={data.subtitle} onChange={v => handleChange('subtitle', v)} />
                          </div>
                          <TextAreaField label="Description" value={data.description} onChange={v => handleChange('description', v)} rows={3} />
                          <InputField label="Years of Experience" value={data.experience} onChange={v => handleChange('experience', v)} />
                          <div className="space-y-6">
                             <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Key Statistics</p>
                             {data.stats?.map((stat, i) => (
                                <div key={i} className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                   <InputField label="Label" value={stat.label} onChange={v => handleArrayUpdate(i, 'label', v, 'stats')} />
                                   <InputField label="Value" value={stat.value} onChange={v => handleArrayUpdate(i, 'value', v, 'stats')} />
                                </div>
                             ))}
                          </div>
                       </div>
                    </SectionCard>
                 )}

                {/* Array based sections (Services, Features, Brands, Videos, Gallery, Certs, Clients) */}
                {['services', 'features', 'brands', 'videos', 'certs', 'clients'].includes(activeTab) && data && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {(Array.isArray(data) ? data : (Array.isArray(data?.items) ? data.items : [])).map((item, i) => (
                        <SectionCard key={i} title={`${activeTab.slice(0, -1)} #${i + 1}`}>
                           <div className="space-y-6">
                               {Object.keys(item).map(key => (
                                 (key.toLowerCase().includes('image') || key.toLowerCase().includes('icon')) ? (
                                   <ImageUploadField 
                                      key={key} 
                                      label={key} 
                                      value={item[key]} 
                                      onChange={v => handleArrayUpdate(i, key, v)}
                                      onUpload={(e) => handleImageUpload(e, (url) => handleArrayUpdate(i, key, url))} 
                                   />
                                 ) : (
                                   <InputField 
                                      key={key} 
                                      label={key} 
                                      value={item[key]} 
                                      onChange={v => handleArrayUpdate(i, key, v)} 
                                   />
                                 )
                              ))}
                               <button 
                                onClick={() => handleRemoveItem(i)}
                                className="text-red-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 pt-4 hover:text-red-500 transition-colors"
                              >
                                 <Trash2 size={14} /> Remove {activeTab.slice(0, -1)}
                              </button>
                           </div>
                        </SectionCard>
                     ))}
                     <button 
                      onClick={handleAddNew}
                      className="h-full min-h-[200px] border-4 border-dashed border-slate-200 rounded-[3rem] text-slate-300 hover:border-primary/40 hover:text-primary transition-all flex flex-col items-center justify-center gap-4"
                     >
                        <Plus size={48} />
                        <span className="font-black uppercase tracking-[0.2em] text-sm">Add New {activeTab.slice(0, -1)}</span>
                     </button>
                  </div>
                )}

                {activeTab === 'gallery' && data && (
                  <SectionCard title="Image Library">
                     <p className="text-sm text-slate-400 font-medium mb-10 -mt-6 italic">Manage all portfolio and gallery visuals.</p>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {Array.isArray(data) && data.map((url, i) => (
                           <div key={i} className="relative group rounded-3xl overflow-hidden aspect-square border-2 border-slate-100 shadow-sm transition-all hover:shadow-xl">
                              <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                 <button 
                                    onClick={() => {
                                      const newData = data.filter((_, idx) => idx !== i);
                                      setData(newData);
                                    }}
                                    className="bg-red-500 text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform"
                                  >
                                    <Trash2 size={20} />
                                  </button>
                              </div>
                           </div>
                        ))}
                        <label className="aspect-square border-4 border-dashed border-slate-200 rounded-3xl text-slate-300 flex flex-col items-center justify-center hover:border-primary/40 hover:text-primary transition-all cursor-pointer group">
                           <Upload size={32} className="group-hover:scale-110 transition-transform mb-2" />
                           <span className="text-[10px] font-black uppercase tracking-widest">Add Image</span>
                           <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={(e) => handleImageUpload(e, (url) => setData([...data, url]))} 
                           />
                        </label>
                     </div>
                  </SectionCard>
                )}

                {activeTab === 'footer' && data && (
                  <SectionCard title="Footer Configuration">
                    <div className="space-y-12">
                      <ImageUploadField 
                        label="Footer Logo (Image or Text)" 
                        value={data.logo} 
                        onChange={v => handleChange('logo', v)}
                        onUpload={(e) => handleImageUpload(e, (url) => handleChange('logo', url))}
                      />
                      <TextAreaField 
                        label="Footer Description" 
                        value={data.description} 
                        onChange={v => handleChange('description', v)} 
                        rows={3}
                      />
                      
                      <div className="grid md:grid-cols-3 gap-8">
                        <InputField label="Contact Phone" value={data.contact?.phone} onChange={v => handleChange('phone', v, ['contact'])} />
                        <InputField label="Contact Email" value={data.contact?.email} onChange={v => handleChange('email', v, ['contact'])} />
                        <InputField label="Office Address" value={data.contact?.address} onChange={v => handleChange('address', v, ['contact'])} />
                      </div>

                      <div className="space-y-6">
                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Footer Service Links</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          {data.links?.services?.map((link, i) => (
                            <div key={i} className="flex gap-4 items-center">
                              <div className="flex-1">
                                <InputField value={link} onChange={v => {
                                  const newLinks = [...data.links.services];
                                  newLinks[i] = v;
                                  handleChange('services', newLinks, ['links']);
                                }} />
                              </div>
                              <button 
                                onClick={() => {
                                  const newLinks = data.links.services.filter((_, idx) => idx !== i);
                                  handleChange('services', newLinks, ['links']);
                                }}
                                className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => {
                            const newLinks = [...(data.links?.services || []), "New Service Link"];
                            handleChange('services', newLinks, ['links']);
                          }}
                          className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest mt-4"
                        >
                          <Plus size={16} /> Add Link
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                        <div className="space-y-6">
                           <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Newsletter Settings</p>
                           <InputField label="Newsletter Heading" value={data.newsletter?.heading} onChange={v => handleChange('heading', v, ['newsletter'])} />
                           <TextAreaField label="Newsletter Text" value={data.newsletter?.text} onChange={v => handleChange('text', v, ['newsletter'])} rows={2} />
                        </div>
                        <div className="space-y-6">
                           <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Social Media Links</p>
                           <div className="grid grid-cols-2 gap-4">
                              <InputField label="Facebook URL" value={data.socials?.facebook} onChange={v => handleChange('facebook', v, ['socials'])} />
                              <InputField label="Twitter URL" value={data.socials?.twitter} onChange={v => handleChange('twitter', v, ['socials'])} />
                              <InputField label="LinkedIn URL" value={data.socials?.linkedin} onChange={v => handleChange('linkedin', v, ['socials'])} />
                              <InputField label="Instagram URL" value={data.socials?.instagram} onChange={v => handleChange('instagram', v, ['socials'])} />
                           </div>
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                )}

              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// --- Helper Components ---

const OverviewView = () => (
  <div className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatCard label="Total Reach" value="47k+" growth="+12%" icon={Users} color="bg-blue-500" />
      <StatCard label="Response Rate" value="98.2%" growth="+1.4%" icon={Activity} color="bg-green-500" />
      <StatCard label="Active Alerts" value="02" growth="Stable" icon={Shield} color="bg-primary" />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 min-h-[450px] relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900">Traffic Intelligence</h3>
            <div className="flex gap-2">
               {['D', 'W', 'M', 'Y'].map(t => <button key={t} className={`w-10 h-10 rounded-xl font-bold text-xs ${t === 'W' ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}>{t}</button>)}
            </div>
          </div>
          <div className="flex items-end justify-between h-64 gap-3">
             {[40, 25, 65, 85, 45, 95, 100, 75, 55, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-50 rounded-2xl group relative h-full">
                   <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} className="absolute bottom-0 left-0 right-0 bg-primary/10 rounded-2xl group-hover:bg-primary transition-all cursor-pointer" />
                </div>
             ))}
          </div>
       </div>

       <div className="bg-[#1A1A1A] p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
             <div>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-primary/40"><Box size={32} /></div>
                <h3 className="text-3xl font-black text-white mb-4 leading-tight">System<br />Optimized.</h3>
                <p className="text-white/30 font-medium text-lg leading-relaxed">Your cloud-sync and PostgreSQL connection are operating at peak performance (9ms latency).</p>
             </div>
             <button className="bg-white text-black py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl">
                Diagnostic Report
             </button>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/20 transition-all" />
       </div>
    </div>
  </div>
);

const SectionCard = ({ title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[4rem] p-10 lg:p-14 shadow-sm border border-slate-100">
    <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
      <Edit3 className="text-slate-200" size={20} />
    </div>
    {children}
  </motion.div>
);

const StatCard = ({ label, value, growth, icon: Icon, color }) => (
  <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex items-center gap-8 group hover:border-primary/20 transition-all hover:shadow-2xl">
    <div className={`w-20 h-20 ${color}/10 rounded-[2rem] flex items-center justify-center text-primary group-hover:scale-110 transition-all shadow-inner`}>
      <Icon size={32} />
    </div>
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-center gap-4">
        <h3 className="text-3xl font-black text-slate-900">{value}</h3>
        <span className="text-xs font-black py-1 px-3 bg-green-50 text-green-600 rounded-xl">{growth}</span>
      </div>
    </div>
  </div>
);

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] ml-6">{label}</label>
    <input 
      type={type} 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-50 px-8 py-6 rounded-full font-bold text-slate-800 focus:bg-white border-2 border-transparent focus:border-primary/20 outline-none transition-all shadow-sm focus:shadow-xl" 
    />
  </div>
);

const TextAreaField = ({ label, value, onChange, rows = 2 }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] ml-6">{label}</label>
    <textarea 
      rows={rows} 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-50 px-8 py-7 rounded-[3rem] font-bold text-slate-800 focus:bg-white border-2 border-transparent focus:border-primary/20 outline-none transition-all shadow-sm focus:shadow-xl resize-none" 
    />
  </div>
);

const ImageUploadField = ({ label, value, onChange, onUpload }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] ml-6">{label}</label>
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <input 
          type="text" 
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste URL or use upload button..."
          className="w-full bg-slate-50 px-8 py-6 rounded-full font-bold text-slate-800 focus:bg-white border-2 border-transparent focus:border-primary/20 outline-none transition-all shadow-sm focus:shadow-xl" 
        />
      </div>
      <label className="flex items-center justify-center gap-3 px-8 py-6 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-primary transition-all shadow-xl active:scale-95 whitespace-nowrap min-w-[160px]">
        <Upload size={18} />
        Upload local
        <input type="file" className="hidden" accept="image/*" onChange={onUpload} />
      </label>
    </div>
    {value && (
      <div className="mt-4 px-6 py-4 bg-white rounded-[2.5rem] border border-slate-100 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <img src={value} alt="Preview" className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-50 shadow-md" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-900 truncate max-w-[250px]">{value.split('/').pop()}</span>
            <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Linked successfully</span>
          </div>
        </div>
        <div className="px-4 py-2 bg-primary/5 text-primary rounded-xl text-[9px] font-black uppercase tracking-widest border border-primary/10">
          Ready to save
        </div>
      </div>
    )}
  </div>
);

export default AdminDashboard;
