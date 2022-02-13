import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./auth/authReducer";
import thunk from "redux-thunk";
import postsReducer from "./posts/postsReducer";
import userReducer from "./user/userReducer";


const reducers = combineReducers({
    auth: authReducer,
    posts:postsReducer,
    user:userReducer,
})


const store = createStore(
    reducers,

        applyMiddleware(thunk)

);

export default store;