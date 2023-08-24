import {instance} from "./instance";
export const authAPI = {
    async auth() {
        const response = await instance
            .get(`auth/me`);
        return response.data;
    }
}