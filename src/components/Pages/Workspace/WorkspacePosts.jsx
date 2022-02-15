import {Link} from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React from "react";
import {useDispatch} from "react-redux";
import {deleteUserPost} from "../../../redux/user/userAction";

function WorkspacePosts({title, createdAt, views, id, setModal}) {
    const date = new Date(createdAt).toLocaleDateString()
    const deletePost = () => {
        setModal({id, title})
    }
    return (
        <li className='workspace_item'>
            <div className='workspace_top'>
                <h3 className='workspace_title'>{title}</h3>
                <div>
                    <Link to={`/workspace/edit/${id}`} style={{
                        marginRight: '15px'
                    }}>
                        <button className='btn'>Редактировать</button>
                    </Link>
                    <button className='btn' onClick={deletePost}>Удалить</button>
                </div>
            </div>
            <div className='workspace_bottom'>
                <div className='views'>
                    <span className='views_count'>{views} </span>
                    <RemoveRedEyeIcon/>
                </div>
                <time>Дата создания поста {date}</time>
            </div>
        </li>
    )
}

export default WorkspacePosts