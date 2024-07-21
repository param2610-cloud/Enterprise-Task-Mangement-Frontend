import api from "../api";

const validateAccessToken = async () => {
    try {
        const response = await api.post('/users/validate-token');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error:any) {
        if (error.response && error.response.data) {
            console.error('Validation error:', error.response.data.message); 
        } else {
            console.error('Validation error:', error.message); 
        }
        return error;
    }
};


const getNewAccessToken = async () => {
    try {
        const response = await api.post('/users/refresh-token');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error:any) {
        if (error.response && error.response.data) {
            console.error('Refresh error:', error.response.data.message); 
        } else {
            console.error('Refresh error:', error.message); 
        }
        return error;
    }
};

export {getNewAccessToken,validateAccessToken};