import {instance} from './AxiosInstance'

export const commentAPI = {
    comment(total) {
        return instance.get('/comments?&limit=' + total).then(response => response.data);
    },

    comments(id) {
        return instance.get(`comments/post/` + id).then(response => response.data);
    },

    addComment(text, postId) {
        return instance.post(`comments`, {
            text,
            postId
        }).then(response => response.data);
    },

    editComment(text, postId) {
        return instance.patch(`comments/` + postId, {text}).then(response => response.data);
    },

    delComment(id) {
        return instance.delete(`comments/` + id).then(response => response.data);
    }
}