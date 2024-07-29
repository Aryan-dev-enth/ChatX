import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const register = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/register`, payload);
    return response.data; 
  } catch (error) {
    console.error("Error during registration:", error);
    
  }
};

export const login = async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login`, payload);
      return response.data; 
    } catch (error) {
      console.error("Error during login:", error);
      
    }
  };
  
