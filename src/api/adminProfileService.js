import { getContent, updateContent } from './contentService';
import {
  ADMIN_PROFILE_STORAGE_KEY,
  getAdminProfileTimestamp,
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
  const normalizedCachedProfile = cachedProfile
    ? normalizeAdminProfile(cachedProfile)
    : null;
  const normalizedRemoteProfile = remoteProfile
    ? normalizeAdminProfile(remoteProfile)
    : null;

  const resolvedProfile =
    getAdminProfileTimestamp(normalizedCachedProfile) >=
    getAdminProfileTimestamp(normalizedRemoteProfile)
      ? normalizedCachedProfile || normalizedRemoteProfile
      : normalizedRemoteProfile || normalizedCachedProfile;

  return cacheAdminProfile(resolvedProfile);
};

export const saveAdminProfile = async (profile) => {
  const normalizedProfile = normalizeAdminProfile({
    ...profile,
    updatedAt: new Date().toISOString(),
  });
  cacheAdminProfile(normalizedProfile);
  const result = await updateContent('adminProfile', normalizedProfile);

  if (!result.success) {
    return {
      success: true,
      profile: normalizedProfile,
      warning: result.error || 'Saved locally. Remote sync failed.',
    };
  }

  return { success: true, profile: normalizedProfile };
};
