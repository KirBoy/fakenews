import {instance} from './AxiosInstance'

export const authAPI = {
    register(fullName, email, password) {
        return instance.post(`auth/register`, {fullName, email, password}).then(response => response.data);
    },

    login(email, password) {
        return instance.post(`auth/login`, {email, password}).then(response => response.data);
    },

}