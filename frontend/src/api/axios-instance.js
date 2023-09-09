import axios from 'axios';
// import { getCookie } from 'cookies-next';

const axiosInstance = axios.create({
    baseURL: `${process.env.API_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Modify the request config here (add headers, authentication tokens)
//         const accessToken = getCookie('access_token');

//         // If token is present add it to request's Authorization Header
//         if (accessToken) {
//             if (config.headers) config.headers.Authorization = accessToken;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error),
// );

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response, // Modify the response data here
    (error) => Promise.reject(error), // Handle response errors here
);
export default axiosInstance;
