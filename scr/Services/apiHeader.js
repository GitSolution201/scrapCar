import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://scrape4you.onrender.com',
    headers: {
        "Cache-Control": "no-cache",
        "Accept": "application/json",
        'Content-Type':'multipart/form-data'
    },
});

export const axiosHeader = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
};