import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Enable sending cookies
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`, {
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`, {
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error Response:', {
        status: error.response.status,
        data: error.response.data
      });
      const message = error.response.data.message || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No Response Received:', error.request);
      return Promise.reject(new Error('No response from server. Please check your connection.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Setup Error:', error.message);
      return Promise.reject(new Error('Error setting up the request.'));
    }
  }
);

// Auth API
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    try {
      console.log('Registering user:', { ...userData, password: '[hidden]' });
      const response = await api.post('/users/register', userData);
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      console.log('Logging in user:', { email: credentials.email, password: '[hidden]' });
      const response = await api.post('/users/login', credentials);
      console.log('Login successful:', { ...response.data, token: '[hidden]' });
      return response.data;
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error;
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      console.log('Getting user profile');
      const response = await api.get('/users/profile');
      console.log('Profile retrieved:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to get profile:', error.message);
      throw error;
    }
  },

  // Update profile image
  updateProfileImage: async (formData) => {
    try {
      console.log('Updating profile image');
      const response = await api.put('/users/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Profile image updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to update profile image:', error.message);
      throw error;
    }
  }
};

export default api; 