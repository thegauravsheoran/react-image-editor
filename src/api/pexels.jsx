const BASE_URL = 'https://api.pexels.com/v1/search?per_page=12&query=';

export const getImages = async (query) => {
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  try {
    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty.');
    }
    const res = await fetch(`${BASE_URL}${query}`, {
      headers: {
        Authorization: API_KEY,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch images: ${res.statusText}`);
    }
    const data = await res.json();
    return data.photos;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    return [];
  }
};