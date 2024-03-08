import axios from "axios"

const Api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    },
});

export default Api;