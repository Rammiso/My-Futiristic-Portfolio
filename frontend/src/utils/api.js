import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:10000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem("adminToken");
        if (window.location.pathname.includes("/admin/dashboard")) {
          window.location.href = "/admin/login";
        }
      }

      // Return error message from server
      return Promise.reject(data.message || "An error occurred");
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject("Network error. Please check your connection.");
    } else {
      // Something else happened
      return Promise.reject(error.message || "An unexpected error occurred");
    }
  }
);

export default api;
