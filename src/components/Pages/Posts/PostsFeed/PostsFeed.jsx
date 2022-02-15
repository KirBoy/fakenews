import React, {useEffect} from "react";
import './postsFeed.css'
import {useDispatch, useSelector} from "react-redux";
import PostPreview from "./PostPreview";
import Filters from "../../../common/Filters";
import {PostsFeedLoader} from "../../../common/Loaders";
import {addNewPosts} from "../../../../redux/posts/postsActions";

function PostsFeed() {
    const {posts, query, isLoading, currentPage, pages, allPosts} = useSelector(state => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        const onScroll = () => {
            const height = document.body.offsetHeight
            const screenHeight = window.innerHeight
            const scrolled = window.scrollY
            const threshold = height - screenHeight / 2
            const position = scrolled + screenHeight
            if (position >= threshold && pages >= currentPage) {
                dispatch(addNewPosts())
            }
        };
        document.addEventListener('scroll', onScroll);

        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, [allPosts.length]);


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
                        {posts.map(el => <PostPreview
                            key={el._id}
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