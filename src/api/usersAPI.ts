import {instance} from "./instance";
export const usersAPI = {
    async getUsers(page: number = 1, count: number = 10) {
        const response = await instance.get(`users?page=${page}&count=${count}`);
        return response.data;
    },
}