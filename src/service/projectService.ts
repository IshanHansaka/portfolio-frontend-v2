import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetchAllProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    console.log('Fetched projects:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
