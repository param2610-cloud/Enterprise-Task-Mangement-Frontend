import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
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
