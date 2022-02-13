import {useDispatch, useSelector} from "react-redux";
import React, {useRef} from "react";
import {deleteUserComment, setEditComment} from "../../../../redux/posts/postsActions";
import style from "../Post/post.module.css";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import AddComment from "./AddComment";
import {stringAvatar} from "../../../../tools";

function Comment({text, createdAt, fullName, userId, commentId, postId}) {
    const dispatch = useDispatch()
    const editCommentId = useSelector(state => state.posts.editCommentId)
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
            <AddComment postId={postId}
                        text={text}
                        commentId={commentId}
                        fullName={fullName}
                        userId={userId}/>
        )
    }

    return (
        <li className={style.comment} onMouseOver={changeOpacity} onMouseOut={changeOpacity}>
            <Link to={`/user/${userId}`} className={style.comment_link}>
                <Avatar className={style.comment_avatar} {...stringAvatar(fullName)} />
                <h3>{fullName}</h3>
            </Link>
            <div className={style.comment_inner}>
                <p className={style.comment_text}>{text}</p>
                <time className={style.comment_time}>{date}</time>
            </div>

            {userId === localStorage.getItem('id') &&
            <div className={style.comment_icons} ref={icons}>
                <ClearIcon onClick={deleteComment}/>
                <EditIcon className={style.comment_edit} onClick={editComment}/>
            </div>}
        </li>
    )
}

export default Comment