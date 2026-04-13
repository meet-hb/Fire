const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';

export const getContent = async (section) => {
  try {
    const response = await fetch(`${API_URL}/content/${section}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    console.error(`Error fetching ${section}:`, err);
    return null;
  }
};

export const updateContent = async (section, content) => {
  try {
    const response = await fetch(`${API_URL}/content/${section}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    return await response.json();
  } catch (err) {
    console.error(`Error updating ${section}:`, err);
    return { error: err.message };
  }
};