export const characterLimit = process.env.REACT_APP_CHARACTER_LIMIT || 4000; // Max limit is 4096
export const characterLimitLargeText = process.env.REACT_APP_CHARACTER_LIMIT_LARGE_TEXT || 10000; // You can change this limit as needed
export const backendBaseUrl = window.DYNAMIC_CONF_BACKEND_BASE_URL || process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:3001'; // Replace with your actual backend URL (omit the last slash /)
