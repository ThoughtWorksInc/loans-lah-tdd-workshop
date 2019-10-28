import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from "../UserContext";

function AuthenticatedRoute ({ render, ...routeProps }) {
    const user = useContext(UserContext);
    return (
        <Route
            {...routeProps}
            render={() => (user.loggedIn ?
                render() :
                <Redirect to='/login' />)
            }
        />
    );
};

export default AuthenticatedRoute;