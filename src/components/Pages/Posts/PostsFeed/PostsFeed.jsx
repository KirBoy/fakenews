import React from "react";
import './postsFeed.css'
import {useSelector} from "react-redux";
import PostPreview from "./PostPreview";
import Filters from "../../../common/Filters";
import {PostsFeedLoader} from "../../../common/Loaders";

function PostsFeed() {
    const {posts, query, isLoading} = useSelector(state => state.posts)

    if (posts.length === 0 && query) {
        return (
            <div>
                <Filters/>
                <p className='post__error'>По запросу {query} ничего не найдено</p>
            </div>
        )
    }

    return (
        <>
            <Filters/>
            <div className='posts__inner'>
                {isLoading ?
                    <ul>{[1, 2, 3].map((el, i) =>
                        <li className='post' key={i}>
                            <PostsFeedLoader/>
                        </li>)}
                    </ul>
                    :
                    <ul className='posts'>
                        {posts.map(el => <PostPreview key={el._id}
                                                   title={el.title}
                                                   user={el.user.fullName}
                                                   date={el.createdAt}
                                                   id={el._id} views={el.views}
                                                   img={el.photoUrl}
                                                   description={el.description}/>)}
                    </ul>}
            </div>
        </>
    )
}

export default PostsFeed