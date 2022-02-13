const SET_USER_PROFILE = 'SET_USER_PROFILE'
const DELETE_POST = 'DELETE_POST'
const PATCH_POST = 'PATCH_POST'
const ADD_POST = 'ADD_POST'
const USER_IS_LOADING = 'USER_IS_LOADING'
const POST_IS_FETCHING = 'POST_FETCHING'
const RESET_POST_STATUS = 'RESET_POST_STATUS'

const initialState = {
    fullName: null,
    createdAt: '',
    comments: [],
    posts: [],
    isLoading: false,
    postLoadingStatus: false
}


const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_PROFILE:
            return {
                ...state, fullName: action.fullName,
                createdAt: action.createdAt,
                comments: action.comments,
                posts: action.posts,
                isLoading: false,
            }

        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(el => el._id !== action.id)
            }

        case PATCH_POST:
            return {
                ...state, posts: state.posts.map(el => {
                    if (el._id === action.id) {
                        return {
                            ...el, title: action.title, text: action.text
                        }
                    } else {
                        return el
                    }
                }), postLoadingStatus: 'added'
            }

        case ADD_POST:
            return {
                ...state, posts: [...state.posts, action.post], postLoadingStatus: 'added'
            }

        case USER_IS_LOADING: {
            return {
                ...state, isLoading: true
            }
        }

        case POST_IS_FETCHING: {
            return {
                ...state, postLoadingStatus: 'fetching'
            }
        }

        case RESET_POST_STATUS: {
            return {
                ...state, postLoadingStatus: false
            }
        }

        default :
            return state
    }
}

export default userReducer