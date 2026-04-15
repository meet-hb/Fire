import { getContent, updateContent } from './contentService';
import {
  ADMIN_PROFILE_STORAGE_KEY,
  normalizeAdminProfile,
} from '../data/adminProfile';

export const getCachedAdminProfile = () => {
  const cachedProfile = localStorage.getItem(ADMIN_PROFILE_STORAGE_KEY);
  if (!cachedProfile) return null;

  try {
    return normalizeAdminProfile(JSON.parse(cachedProfile));
  } catch (error) {
    console.warn('Failed to parse cached admin profile:', error);
    localStorage.removeItem(ADMIN_PROFILE_STORAGE_KEY);
    return null;
  }
};

export const cacheAdminProfile = (profile) => {
  const normalizedProfile = normalizeAdminProfile(profile);
  localStorage.setItem(
    ADMIN_PROFILE_STORAGE_KEY,
    JSON.stringify(normalizedProfile)
  );
  return normalizedProfile;
};

export const fetchAdminProfile = async () => {
  const cachedProfile = getCachedAdminProfile();
  const remoteProfile = await getContent('adminProfile');
  const resolvedProfile = normalizeAdminProfile(remoteProfile || cachedProfile);
  return cacheAdminProfile(resolvedProfile);
};

export const saveAdminProfile = async (profile) => {
  const normalizedProfile = normalizeAdminProfile(profile);
  const result = await updateContent('adminProfile', normalizedProfile);

  if (!result.success) {
    return result;
  }

  cacheAdminProfile(normalizedProfile);
  return { success: true, profile: normalizedProfile };
};
