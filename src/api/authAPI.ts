import {instance} from "./instance";
export const authAPI = {
    auth() {
        return instance
            .get(`auth/me`)
            .then(response => response.data)
    }
}