import axios from "axios";

const api = axios.create({
    baseURL: `https://employee-management-api-alpha.vercel.app/api/v1/`,
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
