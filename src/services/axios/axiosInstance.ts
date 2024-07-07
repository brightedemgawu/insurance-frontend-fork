import axios from 'axios';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;

export const axiosInstance = axios.create({
    baseURL: BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    },
});
