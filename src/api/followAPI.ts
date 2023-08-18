import {UserType} from "../Redux/users_reducer";
import {instance} from "./instance";

export const followAPI = {
    follow(u: UserType) {
        return instance
            .post(`follow/${u.id}`)
            .then(response => response.data)
    },
    unfollow(u: UserType) {
        return instance
            .delete(`follow/${u.id}`)
            .then(response => response.data)
    },
}