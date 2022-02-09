import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import postsReducer from "./postsReducer";
import userReducer from "./userReducer";


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