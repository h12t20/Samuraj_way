import {instance} from "./instance";
import {LoginFormType} from "../components/Login/Login";

export const authAPI = {
    async auth() {
        const response = await instance.get(`auth/me`);
        return response.data;
    },
    async login(loginData: LoginFormType) {
        const response = await instance.post(`auth/login`, loginData);
        return response.data;
    },
    async logout() {
        const response = await instance.delete(`auth/login`);
        return response.data;
    },
    async captcha() {
        const response = await instance.get(`security/get-captcha-url`);
        return response.data;
    }
}