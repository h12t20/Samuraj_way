import axios from "axios";

export const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            "api-key": 'f866834e-8cfc-4d13-b77d-5b9822baa8e3'
        }
    }
)