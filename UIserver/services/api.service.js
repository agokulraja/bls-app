
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        // Add any custom logic here (e.g., attaching tokens)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        // Handle responses globally if needed
        return response;
    },
    (error) => {
        // Handle errors globally
        return Promise.reject(error);
    }
);

export default apiClient; // Export the apiClient instance