import {instance} from "./instance";
export const profileAPI = {
    async getProfile(userID= 29483) {
        const response = await instance.get(`profile/${userID}`);
        return response.data;
    },
    async getStatus(userID= 29483) {
        const response = await instance.get(`profile/status/${userID}`);
        return response.data;
    },
    async updateStatus(status:string) {
        const response = await instance.put(`profile/status/`, {status: status});
        return response.data;
    }
}