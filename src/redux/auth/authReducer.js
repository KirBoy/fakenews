const SET_USER = 'SET_USER'
const SET_MODAL = 'SET_MODAL'
const CHECK_USER = 'CHECK_USER'
const USER_LOGOUT = 'USER_LOGOUT'
const AUTH_IS_FETCHING = 'AUTH_IS_FETCHING'
const RESET_AUTH_FETCHING = 'RESET_AUTH_FETCHING'
const SERVER_ERROR = 'SERVER_ERROR'
const CLEAR_SERVER_ERROR = 'CLEAR_SERVER_ERROR'


const initialState = {
    fullName: null,
    modalOpen: false,
    userAuth: false,
    id: null,
    loadingStatus: false,
    serverError: false
}


const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case CHECK_USER:
            return {
                ...state, userAuth: true, fullName: action.fullName, id: action.id
            }

        case AUTH_IS_FETCHING:
            return {
                ...state, loadingStatus: true
            }


        case RESET_AUTH_FETCHING:
            return {
                ...state, loadingStatus: false
            }

        case SERVER_ERROR:
            return {
                ...state, serverError: true, loadingStatus: false
            }

        case CLEAR_SERVER_ERROR:
            return {
                ...state, serverError: false
            }


        case SET_USER:
            return {
                ...state,
                fullName: action.fullName,
                userAuth: true,
                id: action.id,
                loadingStatus: false,
                serverError: false
            }

        case SET_MODAL: {
            return {
                ...state, modalOpen: !state.modalOpen
            }
        }

        case USER_LOGOUT: {
            return {
                ...state, fullName: null, userAuth: false
            }
        }

        default :
            return state
    }

}

export default authReducer