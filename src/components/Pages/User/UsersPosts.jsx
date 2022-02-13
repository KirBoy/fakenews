import {Link} from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React from "react";

function UsersPosts({title, createdAt, views, id}) {
    const date = new Date(createdAt).toLocaleDateString()
    return (
        <li className='user_post'>
            <Link to={`/posts/${id}`} className='user_link'>
                <h3 className='user_post-title'>{title}</h3>
                <div>
                    <div className='views'>
                        <span className='views_count'>{views} </span>
                        <RemoveRedEyeIcon/>
                    </div>
                    <time>{date}</time>
                </div>
            </Link>
        </li>
    )
}


export default UsersPosts