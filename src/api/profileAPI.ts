import {instance} from "./instance";
import {ProfileInfoType} from "../Redux/redux_store";
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
    },
    async updateProfile(formData:ProfileInfoType) {
        const response = await instance.put(`profile`, formData);
        return response.data;
    },
    async savePhoto(file:File) {
        const  formData = new FormData();
        formData.append('image', file)
        const response = await instance.put(`profile/photo/`, formData, {headers: {
            'Content-Type': 'multipart/form-data'}});
        return response.data;
    }
}