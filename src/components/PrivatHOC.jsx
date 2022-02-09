import {Navigate} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

function PrivateRoute({children}) {
    const isAuth = useSelector(state => state.auth.userAuth);

    if (isAuth) {
        return children
    }

    return (
        <Navigate to='/'/>
    );
}

export default PrivateRoute