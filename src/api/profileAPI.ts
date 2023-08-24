import {instance} from "./instance";
export const profileAPI = {
    async getProfile(userID= 2) {
        const response = await instance.get(`profile/${userID}`);
        return response.data;
    }
}