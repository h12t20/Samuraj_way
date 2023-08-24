import {instance} from "./instance";

export const followAPI = {
    async follow(userID: number) {
        const response = await instance.post(`follow/${userID}`);
        return response.data;
    },
    async unfollow(userID: number) {
        const response = await instance.delete(`follow/${userID}`);
        return response.data;
    },
}