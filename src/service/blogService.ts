import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetchAllBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    console.log('Fetched blogs:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};
