import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Global JWT header configuration 
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers['Authorization'] = "Bearer " + token;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

export default api;