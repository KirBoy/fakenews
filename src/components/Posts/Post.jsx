import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    addComment, commentLoadingStatus,
    deleteUserComment,
    editComment,
    getPost,
    postsIsLoading, resetCommentLoadingStatus, setEditComment
} from "../../redux/postsReducer";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import style from './post.module.css'
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Filters from "../Filters";
import {PostLoader} from "../Loaders";
import {useForm} from "react-hook-form";

function Post() {
    const params = useParams();
    const dispatch = useDispatch()
    const {title, user, text, createdAt, _id, views, description, photoUrl} = useSelector(state => state.posts.post)
    const comments = useSelector(state => state.posts.comments)
    const isLoading = useSelector(state => state.posts.isLoading)
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
            {isLoading ?<div className={style.post}><PostLoader/></div> : <div className={style.post}>
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
                    <div className={style.post__text}>{handleText.map(el => el ? <p>{el}</p> : <br/>)}</div>
                    <ul className={style.post_comments}>
                        {comments.map(el => <Comment key={el._id} text={el.text} createdAt={el.createdAt}
                                                     fullName={el.user.fullName} userId={el.user._id} commentId={el._id}
                                                     postId={params.id}/>)}
                    </ul>
                    {userData.userAuth ?
                        <AddComment postId={_id} text={''} fullName={userData.fullName} userId={userData.id}/> :
                        <Message/>}
                </div>
            </div>}
        </>
    )
}


function Comment({text, createdAt, fullName, userId, commentId, postId}) {
    const editCommentId = useSelector(state => state.posts.editCommentId)
    const dispatch = useDispatch()
    const avatar = fullName.split('').slice(0, 1).join('')
    const date = new Date(createdAt).toLocaleDateString()
    const icons = useRef()

    const deleteComment = () => {
        dispatch(deleteUserComment(commentId, postId))
    }
    const editComment = () => {
        dispatch(setEditComment(commentId))
    }

    const changeOpacity = (e) => {

        if (userId === localStorage.getItem('id') && e._reactName === 'onMouseOver') {
            icons.current.style.opacity = '1'
        }

        if (userId === localStorage.getItem('id') && e._reactName === 'onMouseOut') {
            icons.current.style.opacity = '0'
        }
    }

    if (editCommentId === commentId) {
        return (
            <AddComment postId={postId} text={text} commentId={commentId} fullName={fullName}
                        userId={userId}/>
        )
    }

    return (
        <li className={style.comment} onMouseOver={changeOpacity} onMouseOut={changeOpacity}>
            <Link to={`/user/${userId}`} className={style.comment_link}>
                <Avatar className={style.comment_avatar} style={{
                    backgroundColor: '#2f49ff'
                }}>{avatar}</Avatar>
                <h3>{fullName}</h3>
            </Link>
            <div className={style.comment_inner}>
                <p className={style.comment_text}>{text}</p>
                <time className={style.comment_time}>{date}</time>
            </div>

            {userId === localStorage.getItem('id') && <div className={style.comment_icons} ref={icons}>
                <ClearIcon onClick={deleteComment}/>
                <EditIcon className={style.comment_edit} onClick={editComment}/>
            </div>}
        </li>
    )
}

function AddComment({postId, text, commentId, userId, fullName}) {
    const [loaderId, setLoaderId] = useState('')
    const {register, handleSubmit, setValue, formState} = useForm({
        defaultValues: {
            comment: text,
        }
    });
    const {isSubmitted} = formState

    const loadingStatus = useSelector(state => state.posts.commentLoadingStatus)
    const dispatch = useDispatch()
    const avatar = fullName.split('').slice(0, 1).join('')

    if (loadingStatus === 'added' && isSubmitted) {
        setValue('comment', '')
        dispatch(resetCommentLoadingStatus())
        if (text) {
            dispatch(setEditComment(''))
        }
        setTimeout(() => {
            setLoaderId('')
        }, 0)
    }

    const onSubmit = (data) => {
        if (text && data.comment.trim()) {
            setLoaderId('edit')
            dispatch(commentLoadingStatus())
            dispatch(editComment(data.comment, commentId, postId))
        }
        if (data.comment.trim() && !text) {
            setLoaderId('add')
            dispatch(commentLoadingStatus())
            dispatch(addComment(data.comment, postId))
        }
    }

    return (
        <div className={style.form}>
            <Link to={`/user/${userId}`} className={style.comment_link}>
                <Avatar className={style.comment_avatar} style={{
                    backgroundColor: '#2f49ff'
                }}>{avatar}</Avatar>
                <h3>{fullName}</h3>
            </Link>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form_inner}>
            <textarea className={style.form_textarea} {...register("comment")} name="comment">
            </textarea>
                <div className={style.form_send}>
                    {text ?
                        <button className='btn' type='submit'
                                disabled={loadingStatus === 'fetching'}>сохранить</button> :
                        <button className='btn' type='submit'
                                disabled={loadingStatus === 'fetching'}>отправить</button>}
                    {loadingStatus === 'fetching' && loaderId === 'edit' &&
                    <div className='form__loader form__loader--small'></div>}
                    {loadingStatus === 'fetching' && loaderId === 'add' &&
                    <div className='form__loader form__loader--small'></div>}
                </div>
            </form>
        </div>
    )
}

function Message() {
    return (
        <p>Необходимо авторизоваться чтобы оставлять комментарии</p>
    )
}

export default Post