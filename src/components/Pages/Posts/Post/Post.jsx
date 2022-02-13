import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    addComment, commentLoadingStatus,
    deleteUserComment,
    editComment,
    getPost,
    postsIsLoading, resetCommentLoadingStatus, setEditComment
} from "../../../redux/posts/postsReducer";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import style from './post.module.css'
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Filters from "../../common/Filters";
import {PostLoader} from "../../common/Loaders";
import {useForm} from "react-hook-form";
import AddComment from "./Comment/AddComment";
import Comment from "./Comment/Comment";

function Post() {
    const params = useParams();
    const dispatch = useDispatch()
    const {title, user, text, createdAt, _id, views, description, photoUrl} = useSelector(state => state.posts.post)
    const {comments, isLoading} = useSelector(state => state.posts)
    const userData = useSelector(state => state.auth)
    const date = new Date(createdAt).toLocaleDateString()
    const handleText = text.split('\n')

    React.useEffect(() => {
        dispatch(postsIsLoading())
        dispatch(getPost(params.id))
    }, [])

    return (
        <>
            <Filters/>
            {isLoading ?
                <div className={style.post}>
                    <PostLoader/>
                </div>
                :
                <div className={style.post}>
                    <img className='post_img' src={'http://localhost:5656' + photoUrl} alt={title}/>
                    <div>
                        <h2 className='post_title'>{title}</h2>
                        <Link to={`/user/${user._id}`}>
                            <h3 className={style.post_name}>Автор {user.fullName}</h3>
                        </Link>
                        <div className={style.post_info}>
                            <time>{date}</time>
                            <div className='views'>
                                <span className='views_count'>{views}</span>
                                <RemoveRedEyeIcon/>
                            </div>
                        </div>
                        <div className={style.post__description}>{description}</div>
                        <div className={style.post__text}>
                            {handleText.map(el => el ? <p>{el}</p> : <br/>)}
                        </div>
                        <ul className={style.post_comments}>
                            {comments.map(el => <Comment key={el._id}
                                                         text={el.text}
                                                         createdAt={el.createdAt}
                                                         fullName={el.user.fullName}
                                                         userId={el.user._id}
                                                         commentId={el._id}
                                                         postId={params.id}/>)}
                        </ul>
                        {userData.userAuth ?
                            <AddComment postId={_id}
                                        text={''}
                                        fullName={userData.fullName}
                                        userId={userData.id}/>
                            :
                            <Message/>}
                    </div>
                </div>}
        </>
    )
}

function Message() {
    return (
        <p>Необходимо авторизоваться чтобы оставлять комментарии</p>
    )
}

export default Post