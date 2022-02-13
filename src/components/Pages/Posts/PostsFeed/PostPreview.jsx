import {Link} from "react-router-dom";
import React from "react";

function PostPreview({title, user, date, id, description, img}) {
    const fixedDate = new Date(date).toLocaleDateString()
    return (
        <li className='post'>
            <Link to={`/posts/${id}`}>
                <img className='post_img' src={'http://localhost:5656' + img} alt={title}/>
                <h2 className='post_title'>{title}</h2>
                <h3 className='post_author'>Автор {user}</h3>
                <time className='post_time'>{fixedDate}</time>
                <p className='post_text'>{description}</p>
            </Link>
        </li>
    )
}

export default PostPreview