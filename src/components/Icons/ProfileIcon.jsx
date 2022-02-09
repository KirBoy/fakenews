import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import './icon.css'


function ProfileIcon() {
    const id = useSelector(state => state.auth.id)
    return (
        <Link to={`/user/${id}`} className='icon'>
            <PersonIcon/>
            <span className='icon_name'>Профиль</span>
        </Link>
    )
}

export default ProfileIcon