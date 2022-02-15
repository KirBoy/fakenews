import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {
    addComment,
    commentLoadingStatus,
    editComment,
    resetCommentLoadingStatus,
    setEditComment
} from "../../../../redux/posts/postsActions";
import style from "../Post/post.module.css";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {stringAvatar} from "../../../../tools";

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
                <Avatar className={style.comment_avatar} {...stringAvatar(fullName)}/>
                <h3>{fullName}</h3>
            </Link>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form_inner}>
            <textarea className={style.form_textarea} {...register("comment")} name="comment">
            </textarea>
                <div className={style.form_send}>
                    <button
                        className='btn'
                        type='submit'
                        disabled={loadingStatus === 'fetching'}
                    >
                        {text? 'сохранить': 'отправить'}
                    </button>
                    {loadingStatus === 'fetching' &&
                    loaderId === 'edit' &&
                    <div className='form__loader form__loader--small'/>
                    }
                    {loadingStatus === 'fetching' &&
                    loaderId === 'add' &&
                    <div className='form__loader form__loader--small'>
                    </div>}
                </div>
            </form>
        </div>
    )
}

export default AddComment