/**
 * Dynamic Content Service
 * Handles API communication for both Production (AWS/Vercel) and Development (localhost)
 */

const getBaseUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  // For AWS/VPS deployments, assume Nginx handles the /api proxying
  return '/api';
};

export const API_URL = getBaseUrl();

export const getContent = async (section) => {
  try {
    const response = await fetch(`${API_URL}/content/${section}`);
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`[ContentService] Failed to fetch ${section}:`, err.message);
    return null; // Graceful fallback to static content
  }
};

export const updateContent = async (section, content) => {
  try {
    const response = await fetch(`${API_URL}/content/${section}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ content }),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Update failed');
    
    return { success: true, ...data };
  } catch (err) {
    console.error(`[ContentService] Failed to update ${section}:`, err.message);
    return { success: false, error: err.message };
  }
};