import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const path = '/api';

export const fetchAllProjects = async () => {
  try {
    // const response = await axios.get(`${API_URL}/projects`);
    const response = await axios.get(`${path}/projects`);
    console.log('Fetched projects:', response.data.projects);
    return response.data.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
