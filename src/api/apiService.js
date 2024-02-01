import axios from 'axios';
import { backendBaseUrl } from '../config';

const apiService = axios.create({
  baseURL: backendBaseUrl,
});

// Function to set the auth header
export const setAuthHeader = (token) => {
  if (token) {
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.info("Auth token has been set: ", token);
  } else {
    // Clear the authentication header
    delete apiService.defaults.headers.common['Authorization'];
    console.info("Auth token has been removed");
  }
};

export const getAuthHeader = () => {
  let header = apiService.defaults.headers.common['Authorization'];
  if (header) {
    return { 'Authorization': apiService.defaults.headers.common['Authorization'] };
  }
  return null;
};

export default apiService;
