import axios from "axios";

const client = axios.create({
    baseURL: 'https://63-awesome-jobs-server.vercel.app',
    timeout: 1000,
    withCredentials: true,
});

export default client;