import {profileAPI} from "../../api/userApi";
import {postsAPI} from "../../api/postsAPI";

const SET_USER_PROFILE = 'SET_USER_PROFILE'
const DELETE_POST = 'DELETE_POST'
const PATCH_POST = 'PATCH_POST'
const ADD_POST = 'ADD_POST'
const USER_IS_LOADING = 'USER_IS_LOADING'
const POST_IS_FETCHING = 'POST_FETCHING'
const RESET_POST_STATUS = 'RESET_POST_STATUS'

const setUserProfile = ({createdAt, fullName, comments, posts}) => {
    return {
        type: SET_USER_PROFILE,
        createdAt,
        fullName,
        comments,
        posts
    }
}


const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id
    }
}

const patchPost = (title, text, id) => {
    return {
        type: PATCH_POST,
        title, text, id
    }
}

const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

export const userIsLoading = () => {
    return {
        type: USER_IS_LOADING
    }
}

export const postIsFetching = () => {
    return {
        type: POST_IS_FETCHING
    }
}

export const resetPostStatus = () => {
    return {
        type: RESET_POST_STATUS
    }
}


export const getUserProfile = (id) => async (dispatch) => {
    try {
        let response = await profileAPI.profile(id)
        dispatch(setUserProfile(response))
    } catch (e) {

    }
}

export const addNewPost = ({title, text, photoUrl, desc}) => async (dispatch) => {
    const response = await postsAPI.addPost(title.trim(), text.trim(), photoUrl, desc.trim())
    dispatch(addPost(response))
}

export const deleteUserPost = (id) => async (dispatch) => {
    await postsAPI.delPost(id)
    const responseComments = await postsAPI.comments(id)

    for (const comment of responseComments) {
        await postsAPI.delComment(comment._id)
    }

    dispatch(deletePost(id))
}

export const editPost = ({title, text, photoUrl, desc}, id) => async (dispatch) => {
    await postsAPI.editPost(title.trim(), text.trim(), photoUrl, desc.trim(), id)
    dispatch(patchPost(title, text, id))
}
