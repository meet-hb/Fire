import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, UserRound, Mail, Phone, Globe, MapPin, Briefcase, Building2, FileText, Activity } from 'lucide-react';
import { getContent, updateContent } from '../api/contentService';
import { ADMIN_PROFILE_STORAGE_KEY, defaultAdminProfile, normalizeAdminProfile } from '../data/adminProfile';

const AccountSettingsPage = () => {
  const [formData, setFormData] = React.useState(defaultAdminProfile);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      let parsedCachedProfile = null;
      const cachedProfile = localStorage.getItem(ADMIN_PROFILE_STORAGE_KEY);
      if (cachedProfile) {
        try {
          parsedCachedProfile = JSON.parse(cachedProfile);
          setFormData(normalizeAdminProfile(parsedCachedProfile));
        } catch (error) {
          console.warn('Failed to parse cached admin profile:', error);
        }
      }

      const profile = await getContent('adminProfile');
      const normalizedProfile = normalizeAdminProfile(profile || parsedCachedProfile);
      setFormData(normalizedProfile);
      localStorage.setItem(ADMIN_PROFILE_STORAGE_KEY, JSON.stringify(normalizedProfile));
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (localStorage.getItem('isAdminAuthenticated') !== 'true') {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateContent('adminProfile', formData);
    setSaving(false);

    if (result.success) {
      localStorage.setItem(ADMIN_PROFILE_STORAGE_KEY, JSON.stringify(formData));
      setMessage('Account settings updated successfully.');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setMessage(`Error: ${result.error}`);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const imageDataUrl = await fileToDataUrl(file);
      setFormData((prev) => ({ ...prev, avatar: imageDataUrl }));
      const result = await updateContent('adminProfile', {
        ...formData,
        avatar: imageDataUrl,
      });

      if (!result.success) {
        throw new Error(result.error || 'Profile image update failed.');
      }

      localStorage.setItem(ADMIN_PROFILE_STORAGE_KEY, JSON.stringify({
        ...formData,
        avatar: imageDataUrl,
      }));
      setMessage('Profile image updated successfully.');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Avatar upload failed:', error);
      setMessage(error.message || 'Avatar upload failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff4ed_0%,#f8f9fa_45%,#eef1f4_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.35em] text-primary">Admin Profile</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Account Settings</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium text-slate-500 sm:text-base">
              Update the account information shown inside the admin dashboard and keep your contact details current.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <ArrowLeft size={16} />
              Back To Dashboard
            </Link>
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-6 py-3 text-sm font-black text-primary transition-all hover:bg-primary hover:text-white"
            >
              {isEditing ? 'Preview Mode' : 'Edit Profile'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-black text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)] transition-all hover:-translate-y-0.5 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <Activity size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Updating...' : 'Update Account'}
            </button>
          </div>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-[2rem] border border-primary/10 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm"
          >
            {message}
          </motion.div>
        )}

        {loading ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4 rounded-[2.5rem] bg-white px-10 py-12 shadow-sm">
              <Activity size={34} className="animate-spin text-primary" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Loading profile</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
            <motion.section
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-white shadow-[0_30px_80px_rgba(148,163,184,0.18)]"
            >
              <div className="bg-[linear-gradient(135deg,#f26522_0%,#ff9557_45%,#1a1a1a_160%)] px-8 pb-12 pt-8 text-white">
                <div className="mb-8 flex items-center justify-between">
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em]">
                    Live Profile
                  </span>
                  <span className="rounded-full bg-white/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em]">
                    {formData.role}
                  </span>
                </div>

                <div className="mx-auto h-28 w-28 overflow-hidden rounded-[2rem] border-4 border-white/25 bg-white/15 shadow-2xl">
                  <img src={formData.avatar} alt={formData.fullName} className="h-full w-full object-cover" />
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-black">{formData.fullName}</h2>
                  <p className="mt-2 text-sm font-semibold text-white/80">{formData.email}</p>
                </div>
              </div>

              <div className="space-y-4 px-8 py-8">
                <ProfileMeta icon={Building2} label="Company" value={formData.company} />
                <ProfileMeta icon={Phone} label="Phone" value={formData.phone} />
                <ProfileMeta icon={Globe} label="Website" value={formData.website} />
                <ProfileMeta icon={MapPin} label="Location" value={formData.location} />
                <div className="rounded-[1.75rem] bg-slate-50 p-5">
                  <p className="mb-2 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Bio</p>
                  <p className="text-sm font-medium leading-7 text-slate-600">{formData.bio}</p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[2.75rem] border border-white/60 bg-white p-6 shadow-[0_30px_80px_rgba(148,163,184,0.18)] sm:p-8 lg:p-10"
            >
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-400">Profile Form</p>
                  <h3 className="mt-2 text-2xl font-black text-slate-900">Edit Account Details</h3>
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                  {isEditing ? 'Editing Enabled' : 'Preview Locked'}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <InputField icon={UserRound} label="Full Name" value={formData.fullName} onChange={(value) => handleChange('fullName', value)} disabled={!isEditing} />
                <InputField icon={Mail} label="Email Address" value={formData.email} onChange={(value) => handleChange('email', value)} disabled={!isEditing} type="email" />
                <InputField icon={Briefcase} label="Role / Title" value={formData.role} onChange={(value) => handleChange('role', value)} disabled={!isEditing} />
                <InputField icon={Building2} label="Company" value={formData.company} onChange={(value) => handleChange('company', value)} disabled={!isEditing} />
                <InputField icon={Phone} label="Phone Number" value={formData.phone} onChange={(value) => handleChange('phone', value)} disabled={!isEditing} />
                <InputField icon={MapPin} label="Location" value={formData.location} onChange={(value) => handleChange('location', value)} disabled={!isEditing} />
              </div>

              <div className="mt-6">
                <InputField icon={Globe} label="Website URL" value={formData.website} onChange={(value) => handleChange('website', value)} disabled={!isEditing} />
              </div>

              <div className="mt-6">
                <InputField icon={Upload} label="Avatar URL" value={formData.avatar} onChange={(value) => handleChange('avatar', value)} disabled={!isEditing} />
                <label className={`mt-4 inline-flex items-center gap-3 rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.3em] ${isEditing ? 'cursor-pointer bg-slate-900 text-white hover:bg-primary' : 'cursor-not-allowed bg-slate-100 text-slate-400'} transition-all`}>
                  <Upload size={16} />
                  Upload Photo
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={!isEditing} />
                </label>
              </div>

              <div className="mt-6">
                <TextAreaField icon={FileText} label="Bio" value={formData.bio} onChange={(value) => handleChange('bio', value)} disabled={!isEditing} />
              </div>
            </motion.section>
          </div>
        )}
      </div>
    </div>
  );
};

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });

const ProfileMeta = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 rounded-[1.75rem] border border-slate-100 bg-white px-5 py-4 shadow-sm">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-700">{value}</p>
    </div>
  </div>
);

const InputField = ({ icon: Icon, label, value, onChange, disabled, type = 'text' }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">{label}</label>
    <div className={`flex items-center gap-3 rounded-[1.75rem] border px-5 py-4 transition-all ${disabled ? 'border-slate-100 bg-slate-50' : 'border-slate-200 bg-white shadow-sm focus-within:border-primary/30 focus-within:shadow-lg'}`}>
      <Icon size={18} className="text-slate-400" />
      <input
        type={type}
        value={value || ''}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none disabled:cursor-not-allowed disabled:text-slate-500"
      />
    </div>
  </div>
);

const TextAreaField = ({ icon: Icon, label, value, onChange, disabled }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">{label}</label>
    <div className={`rounded-[2rem] border px-5 py-4 transition-all ${disabled ? 'border-slate-100 bg-slate-50' : 'border-slate-200 bg-white shadow-sm focus-within:border-primary/30 focus-within:shadow-lg'}`}>
      <div className="mb-3 flex items-center gap-3 text-slate-400">
        <Icon size={18} />
        <span className="text-xs font-black uppercase tracking-[0.25em]">About this account</span>
      </div>
      <textarea
        rows={5}
        value={value || ''}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="w-full resize-none bg-transparent text-sm font-bold leading-7 text-slate-700 outline-none disabled:cursor-not-allowed disabled:text-slate-500"
      />
    </div>
  </div>
);

export default AccountSettingsPage;
