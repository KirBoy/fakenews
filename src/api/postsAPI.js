import {instance} from './AxiosInstance'

export const postsAPI = {
    posts(query) {
        return instance.get(`posts?query=` + query).then(response => response.data);
    },


    postsAll(total) {
        return instance.get(`posts?&limit=` + total).then(response => response.data);
    },

    post(id) {
        return instance.get(`posts/` + id).then(response => response.data);
    },

    delPost(id) {
        return instance.delete(`posts/` + id).then(response => response.data);
    },

    addPost(title, text, photoUrl, description) {
        return instance.post(`posts`, {title, text, photoUrl, description}).then(response => response.data);
    },

    addPostImg(formData) {
        return instance.post(`/posts/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },

    editPost(title, text, photoUrl, description, id) {
        return instance.patch(`posts/` + id, {title, text, photoUrl, description}).then(response => response.data);
    },
}