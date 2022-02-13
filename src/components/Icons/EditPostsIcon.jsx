import React from "react";
import {Link} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import './icon.css'

function EditPostsIcon() {
    return (
        <Link to='/workspace' className='icon'>
            <EditIcon/>
            <span className='icon_name'>Редактор записей</span>
        </Link>
    )
}

export default EditPostsIcon