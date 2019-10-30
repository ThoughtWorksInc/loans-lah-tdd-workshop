import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from "../UserContext";

function AuthenticatedRoute ({ render, children, ...routeProps }) {
    const user = useContext(UserContext);

    if (user.loggedIn) {
        return <Route render={render} children={children} {...routeProps}/>;
    } else {
        return <Route render={(props) => (<Redirect to='/login' />)} {...routeProps} />;
    }
}

export default AuthenticatedRoute;