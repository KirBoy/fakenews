import {instance} from './AxiosInstance'

export const profileAPI = {
    profile(id) {
        return instance.get(`users/` + id).then(response => response.data);
    },
}