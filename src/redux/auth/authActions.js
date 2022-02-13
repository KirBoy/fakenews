import {authAPI} from "../../api/authAPI";
import {getCurrentAxiosInstance} from "../../api/AxiosInstance";
import {profileAPI} from "../../api/userApi";

const SET_USER = 'SET_USER'
const SET_MODAL = 'SET_MODAL'
const CHECK_USER = 'CHECK_USER'
const USER_LOGOUT = 'USER_LOGOUT'
const AUTH_IS_FETCHING = 'AUTH_IS_FETCHING'
const RESET_AUTH_FETCHING = 'RESET_AUTH_FETCHING'
const SERVER_ERROR = 'SERVER_ERROR'
const CLEAR_SERVER_ERROR = 'CLEAR_SERVER_ERROR'


export const setOpenModal = () => {
    return {
        type: SET_MODAL
    }
}

export const authIsFetching = () => {
    return {
        type: AUTH_IS_FETCHING
    }
}

export const setUser = (fullName, id) => {
    return {
        type: SET_USER,
        fullName,
        id
    }
}

export const isUserAuth = (fullName, id) => {
    return {
        type: CHECK_USER,
        fullName,
        id
    }
}

export const userLogOut = () => {
    return {
        type: USER_LOGOUT
    }
}

export const serverError = () => {
    return {
        type: SERVER_ERROR
    }
}

export const clearServerError = () => {
    return {
        type: CLEAR_SERVER_ERROR
    }
}


export function setUserProfile(fullName, id) {
    return dispatch => {
        dispatch(setOpenModal())
        dispatch(setUser(fullName, id))
    }
}

export const setRegisterUser = ({fullName, email, password}) => async (dispatch) => {
    try {
        let response = await authAPI.register(fullName, email, password)
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response._id);
        dispatch(setUserProfile(fullName, response._id))
        getCurrentAxiosInstance()
    } catch (e) {
        dispatch(serverError())
    }
}

export const getAuthUser = ({email, password}) => async (dispatch) => {
    try {
        let response = await authAPI.login(email, password)
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response._id);
        dispatch(setUserProfile(response.fullName, response._id))
        getCurrentAxiosInstance()
    } catch (e) {
        dispatch(serverError())
    }
}

export const getUserAuthProfile = (id) => async (dispatch) => {
    let response = await profileAPI.profile(id)
    dispatch(isUserAuth(response.fullName, response._id))
}