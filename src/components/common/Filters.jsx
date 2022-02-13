import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setFilter} from "../../redux/posts/postsActions";
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import {useNavigate} from "react-router-dom";

function Filters() {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.posts.filter)
    const navigate = useNavigate()

    const setFilterClick = (e, filter) => {
        dispatch(setFilter(filter))
        navigate("/");
    }

    return (
        <ul className='filters'>
            <li className={filter === 1 ? 'filter filter--active' : 'filter'}
                onClick={e => setFilterClick(e, 1)}>
                <span className='filter__name'>Свежие</span>
                <AccessTimeRoundedIcon/>
            </li>
            <li className={filter === 2 ? 'filter filter--active' : 'filter'}
                onClick={e => setFilterClick(e, 2)}>
                <span className='filter__name'>Популярные</span>
                <ThumbUpOutlinedIcon/>
            </li>
            <li className={filter === 3 ? 'filter filter--active' : 'filter'}
                onClick={e => setFilterClick(e, 3)}>
                <span className='filter__name'>Обсуждаемые</span>
                <ChatBubbleOutlineRoundedIcon/>
            </li>
        </ul>
    )
}

export default Filters