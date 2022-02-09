import {Link} from "react-router-dom";
import SearchForm from "./SearchForm";
import ProfileIcon from "./Icons/ProfileIcon";
import RegisterOrAuth from "./Regist+Auth/RegisterOrAuth";
import CreatePostLink from "./Icons/EditPostsIcon";
import LogoutIcon from "./Icons/LogoutIcon";
import * as PropTypes from "prop-types";
import React from "react";

function Header(props) {
    return <header className='header'>
        <div className="header_left">
            <Link to="/">
                <img className='logo' src="/assets/logo.svg" alt=""/>
            </Link>

            <SearchForm/>

        </div>
        <div className='header_icons'>
            {props.auth ? <ProfileIcon/> : <RegisterOrAuth/>}
            {props.auth && <CreatePostLink/>}
            {props.auth && <LogoutIcon/>}
        </div>
    </header>;
}

Header.propTypes = {auth: PropTypes.bool};

export default Header