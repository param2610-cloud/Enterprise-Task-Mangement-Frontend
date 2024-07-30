import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.VITE_API_URL}/api/v1/`,
    timeout: 10000,
    withCredentials: true
});

api.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error); // Pass through the error response without modification
    }
);

export default api;
