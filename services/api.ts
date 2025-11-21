import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if the error is 401 and NOT from the login endpoint
        // We want the login page to handle 401s (invalid credentials) itself without redirecting
        if (error.response && error.response.status === 401 && !error.config.url.includes('/auth/login')) {
            // Token is invalid or expired
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Redirect to login page if not already there
            if (window.location.pathname !== '/login' && window.location.pathname !== '/admin-login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
