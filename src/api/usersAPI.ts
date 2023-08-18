import {instance} from "./instance";
export const usersAPI = {
    getUsers(page: number = 1, count: number = 10) {
        return instance.get(`users?page=${page}&count=${count}`)
            .then(response => response.data)
    },
}