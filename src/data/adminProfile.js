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
};

export const normalizeAdminProfile = (profile) => ({
  ...defaultAdminProfile,
  ...(profile || {}),
});
