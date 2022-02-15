import React from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, userIsLoading} from "../../../redux/user/userAction";
import './user.css'
import {UserLoader} from "../../common/Loaders";
import UsersPosts from "./UsersPosts";

function User() {
    const params = useParams();
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const date = new Date(user.createdAt).toLocaleDateString()
    const authId = useSelector(state => state.auth.id)
    React.useEffect(() => {
        dispatch(userIsLoading())
        dispatch(getUserProfile(params.id))
    }, [])

    return (
        <>
            {user.isLoading ?
                <UserLoader/> :
                <div className='user'>
                    <div className='user_left'>
                        <img className='user_ava' src="/assets/avatar.jpeg " alt=""/>
                        <h1 className='user_name'>{user.fullName}</h1>
                        <time>с нами с {date}</time>
                    </div>
                    <div className='user_right'>
                        <h2 className='user_subtitle'>Посты</h2>
                        {user.posts.length ?
                            <ul className='user_list'>
                                {user.posts.map(el => <UsersPosts key={el._id}
                                                                  title={el.title}
                                                                  createdAt={el.createdAt}
                                                                  views={el.views}
                                                                  id={el._id}/>)}
                            </ul> :
                            <p className='user__desc'>
                                {authId === params.id ?
                                    'Вы ' :
                                    user.fullName + ' '}
                                еще не создал ни одного поста.</p>}
                    </div>
                </div>}
        </>
    )
}

export default User