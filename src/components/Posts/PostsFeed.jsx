import React from "react";
import './postsFeed.css'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Filters from "../Filters";
import {PostsFeedLoader} from "../Loaders";

function PostsFeed() {
    const posts = useSelector(state => state.posts.posts)
    const query = useSelector(state => state.posts.query)
    const isLoading = useSelector(state => state.posts.isLoading)

    if (posts.length === 0 && query) {
        return (<div>
            <Filters/>
            <p className='post__error'>По запросу {query} ничего не найдено</p>
        </div>)
    }

    return (
        <>
            <Filters/>
            <div className='posts__inner'>
                {isLoading ? <ul>{[1, 2, 3].map(el => <li className='post'><PostsFeedLoader/></li>)}</ul> :
                    <ul className='posts'>
                        {posts.map(el => <PostMini key={el._id} title={el.title} user={el.user.fullName}
                                                   date={el.createdAt} id={el._id} views={el.views} img={el.photoUrl}
                                                   description={el.description}/>)}
                    </ul>}
            </div>
        </>
    )
}

export default PostsFeed


function PostMini({title, user, date, id, description, img}) {
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

// function PopularPosts({title, user, date, id, views, img}) {
//     const fixedDate = new Date(date).toLocaleDateString()
//     return (
//         <li className='popular'>
//             <Link className='popular__link' to={`/posts/${id}`}>
//                 <img className='popular__img' src={'http://localhost:5656/' + img} alt={title}/>
//                 <div>
//                     <h3 className='popular__title'>{title}</h3>
//                     <h3 className='post_author'>Автор {user}</h3>
//                     <time className='post_time'>{fixedDate}</time>
//                     <span>{views}</span>
//                 </div>
//             </Link>
//         </li>
//     )
// }