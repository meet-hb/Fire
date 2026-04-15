export const defaultAdminProfile = {
  fullName: 'Admin User',
  email: 'admin@weldoseld.com',
  role: 'System Manager',
  phone: '+91 98765 43210',
  website: 'https://weldoseld.com',
  location: 'Kolkata, India',
  bio: 'Manage site content, monitor updates, and keep the WELDOSELD dashboard in sync.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop',
  company: 'WELDOSELD',
  updatedAt: null,
};

export const ADMIN_PROFILE_STORAGE_KEY = 'adminProfile';

export const normalizeAdminProfile = (profile) => ({
  ...defaultAdminProfile,
  ...(profile || {}),
});

export const getAdminProfileTimestamp = (profile) => {
  const value = profile?.updatedAt ? new Date(profile.updatedAt).getTime() : 0;
  return Number.isFinite(value) ? value : 0;
};
