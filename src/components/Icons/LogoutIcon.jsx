import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";
import './icon.css'
import {userLogOut} from "../../redux/authReducer";
import {useDispatch} from "react-redux";

function LogOutIcon() {
    const dispatch = useDispatch()
    const logOut = () => {
        localStorage.clear()
        dispatch(userLogOut())
    }
    return (
        <div className='icon' onClick={logOut}>
            <LogoutIcon/>
            <span className='icon_name'>Выйти</span>
        </div>
    )
}

export default LogOutIcon