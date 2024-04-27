import axios from 'axios';

export default axios.create(
    {
        baseURL: 'http://localhost:8080/api/v1/',
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

/*
config/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
});

Add a request interceptor to include the authentication token
instance.interceptors.request.use(
    config => {
        Get the authentication token from wherever it is stored (e.g., local storage, Redux state, etc.)
        const token = localStorage.getItem('authToken'); // Example: Retrieve token from local storage

        If a token exists, add it to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;

*/