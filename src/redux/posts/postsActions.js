import {postsAPI} from "../../api/postsAPI";
import {commentAPI} from "../../api/commentsAPI";

const SET_POSTS = 'SET_POSTS'
const SET_POST = 'SET_POST';
const SET_COMMENTS = 'SET_COMMENTS';
const SET_IS_LOADING = 'SET_IS_LOADING';
const ADD_NEW_POSTS = 'ADD_NEW_POSTS';
const SET_QUERY = 'SET_QUERY';
const POSTS_IS_LOADING = 'POSTS_IS_LOADING';
const COMMENT_LOADING_STATUS = 'COMMENT_LOADING_STATUS';
const RESET_COMMENT_LOADING_STATUS = 'RESET_COMMENT_LOADING_STATUS';
const SET_FILTER = 'SET_FILTER';
const ADD_COMMENT = 'ADD_COMMENT';
const SET_EDIT_COMMENT = 'SET_EDIT_COMMENT';


export const setPosts = (posts, total) => {
    return {
        type: SET_POSTS,
        posts,
        total
    }
}

export const setIsLoading = () => {
    return {
        type: SET_IS_LOADING,
    }
}

const setOnePostContent = (post) => {
    return {
        type: SET_POST,
        post
    }
}

export const addNewPosts = (posts) => {
    return {
        type: ADD_NEW_POSTS,
        posts
    }
}

export const setQuery = (query) => {
    return {
        type: SET_QUERY,
        query
    }
}


export const postsIsLoading = () => {
    return {
        type: POSTS_IS_LOADING
    }
}


const setComments = (comments) => {
    return {
        type: SET_COMMENTS,
        comments
    }
}

const addCommentAction = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const commentLoadingStatus = () => {
    return {
        type: COMMENT_LOADING_STATUS,
    }
}

export const resetCommentLoadingStatus = () => {
    return {
        type: RESET_COMMENT_LOADING_STATUS,
    }
}


export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        filter
    }
}

export const setEditComment = (commentId) => {
    return {
        type: SET_EDIT_COMMENT,
        commentId
    }
}

function setPost(post, comments) {
    return dispatch => {
        dispatch(setOnePostContent(post))
        dispatch(setComments(comments))
    }
}


export const getPosts = () => async (dispatch, getState) => {
    const query = getState().posts.query
    const response = await postsAPI.posts('')
    const allPosts = await postsAPI.postsAll(response.total)
    const filteredPost = filterByQuery(allPosts.items, query)
    switch (getState().posts.filter) {
        case 1: {
            dispatch(setPosts(filteredPost, filteredPost.length))
            break
        }

        case 2: {
            dispatch(setPosts(filteredPost.sort((a, b) => b.views - a.views), filteredPost.length))
            break
        }

        case 3: {
            const comments = await commentAPI.comment(1)
            const allComments = await commentAPI.comment(comments.total)

            let posts = []
            let postsWithComments = []
            allComments.items.forEach(el => {
                if (posts.every(obj => obj.post !== el.post)) {
                    posts.push({post: el.post, comments: 0})
                }
            })

            posts.forEach(post => {
                postsWithComments.push({
                    post: post.post,
                    comments: allComments.items.filter(el => el.post === post.post).length
                })
            })

            postsWithComments = postsWithComments.sort((a, b) => b.comments - a.comments)

            let filteredPost = []

            for (const post of postsWithComments) {
                const resp = await postsAPI.post(post.post)
                filteredPost.push(resp)
            }

            filteredPost = filterByQuery(filteredPost, query)

            dispatch(setPosts(filteredPost, filteredPost.length))
            break
        }
    }

}

export const getPost = (id) => async (dispatch) => {
    const response = await postsAPI.post(id)
    const responseComments = await commentAPI.comments(id)
    if (response) {
        dispatch(setPost(response, responseComments))
    }
}

export const addComment = (text, id) => async (dispatch) => {
    const response = await commentAPI.addComment(text, id)
    dispatch(addCommentAction(response))
}

export const editComment = (text, id, postId) => async (dispatch) => {
    let response = await commentAPI.editComment(text, id)
    let responseComments = await commentAPI.comments(postId)
    if (response) {
        dispatch(setComments(responseComments))
    }
}

export const deleteUserComment = (id, postId) => async (dispatch) => {
    await commentAPI.delComment(id)
    let responseComments = await commentAPI.comments(postId)
    dispatch(setComments(responseComments))
}


function filterByQuery(arr, query) {
    return arr.filter(post => {
        if (post.title.toLowerCase().includes(query) || post.text.toLowerCase().includes(query)) {
            return true
        }
    })
}