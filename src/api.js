import * as axios from "axios";

let instance = axios.create({
    baseURL: 'http://localhost:5656',
    headers: {"Authorization": localStorage.getItem('token')}
})

export function getCurrentAxiosInstance() {
    instance = axios.create({
        baseURL: 'http://localhost:5656',
        headers: {"Authorization": localStorage.getItem('token')}
    })
}

export const authAPI = {
    register(fullName, email, password) {

        return instance.post(`auth/register`, {fullName, email, password}).then(response => response.data);
    },

    login(email, password) {
        return instance.post(`auth/login`, {email, password}).then(response => response.data);
    },

}

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

export const profileAPI = {
    profile(id) {
        return instance.get(`users/` + id).then(response => response.data);
    },
}