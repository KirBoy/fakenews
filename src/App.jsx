import './App.css';
import React, {useEffect} from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PostsFeed from "./components/Pages/Posts/PostsFeed/PostsFeed";
import Post from "./components/Pages/Posts/Post/Post";
import User from "./components/Pages/User/User";
import {getUserAuthProfile} from "./redux/auth/authActions";
import WorkSpace from "./components/Pages/Workspace/WorkSpace";
import PrivateRoute from "./components/PrivatHOC";
import CreateOrEditPost from "./components/Pages/Workspace/CreateOrEditPost";
import Header from "./components/common/Header";
import {getPosts, postsIsLoading} from "./redux/posts/postsActions";

function App() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.userAuth)
    const {query, filter, posts} = useSelector(state => state.posts)
    const postLoadingStatus = useSelector(state => state.user.posts)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(getUserAuthProfile(localStorage.getItem('id')))
        }
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        dispatch(postsIsLoading())
        dispatch(getPosts())
    }, [query, filter, postLoadingStatus])


    return (
        <>
            <Header auth={auth}/>
            <div className='container'>
                <Routes>
                    <Route path="/" element={<PostsFeed/>}/>
                    <Route path="/posts/:id" element={<Post/>}/>
                    <Route path='/user/:id' element={<User/>}/>
                    <Route path='/workspace/edit/:id'
                           element={
                               <PrivateRoute>
                                   <CreateOrEditPost/>
                               </PrivateRoute>}/>
                    <Route path='/workspace/create'
                           element={
                               <PrivateRoute>
                                   <CreateOrEditPost/>
                               </PrivateRoute>}/>
                    <Route path='/workspace' element={<PrivateRoute>
                        <WorkSpace/>
                    </PrivateRoute>}/>
                    <Route
                        path="*"
                        element={
                            <main style={{padding: "1rem"}}>
                                <p>Тут ничего нету!</p>
                            </main>
                        }
                    >
                    </Route>
                </Routes>
            </div>
        </>
    )

}

export default App;
