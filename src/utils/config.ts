import { getDecryptToken } from "@/proxy/local-storage";
import axios from "axios";

export const EXPO_PUBLIC_API_URL = 'http://10.5.221.249:8080/api/v1';

export const http = axios.create({
    baseURL: EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const setAuthToken = (token: string | null) => {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
    delete http.defaults.headers.common['Authorization'];
};


http.interceptors.request.use(
    async (config) => {
        const token = await getDecryptToken();
        setAuthToken(token);
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            removeAuthToken();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

