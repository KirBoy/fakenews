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

const initialState = {
    posts: [],
    pages: 0,
    post: {title: null, user: {fullName: null}, text: '', createdAt: '', id: null, views: 0},
    comments: [],
    currentPage: 1,
    isLoading: false,
    query: '',
    filter: 1,
    allPosts: [],
    commentLoadingStatus: false,
    editCommentId: ''
}


const postReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_POSTS:
            return {
                ...state,
                posts: action.posts.slice(0, 5),
                pages: Math.ceil(action.total / 5),
                allPosts: action.posts,
                currentPage: 1,
                isLoading: false
            }

        case SET_POST:
            return {
                ...state, post: action.post, isLoading: false
            }

        case SET_EDIT_COMMENT:
            return {
                ...state, editCommentId: action.commentId
            }

        case SET_COMMENTS:
            return {
                ...state, comments: action.comments, commentLoadingStatus: 'added'
            }

        case COMMENT_LOADING_STATUS:
            return {
                ...state, commentLoadingStatus: 'fetching'
            }

        case RESET_COMMENT_LOADING_STATUS:
            return {
                ...state, commentLoadingStatus: false
            }

        case ADD_COMMENT:
            return {
                ...state, comments: [...state.comments, action.comment], commentLoadingStatus: 'added'
            }

        case POSTS_IS_LOADING:
            return {
                ...state, isLoading: true
            }

        case ADD_NEW_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...state.allPosts.slice(5 * state.currentPage, 5 * (state.currentPage + 1))],
                currentPage: state.currentPage + 1,
                isLoading: false
            }

        case SET_QUERY:
            return {
                ...state, query: action.query.toLowerCase()
            }

        case SET_FILTER:
            return {
                ...state, filter: action.filter
            }

        default :
            return state
    }

}

export default postReducer