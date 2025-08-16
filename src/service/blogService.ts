import axios from 'axios';

export const fetchAllBlogs = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs`
    );
    console.log('Fetched blogs:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};
