import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthUserContext } from './index';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <AuthUserContext.Consumer>
            {authUser =>
                <Route {...rest} render={props => (
                    authUser ?
                        <Component {...props} />
                        : <Redirect to="/signin" />
                )} />
            }
        </AuthUserContext.Consumer>
    );
};

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <AuthUserContext.Consumer>
            {authUser =>
                <Route {...rest} render={props => (
                    authUser && restricted ?
                        <Redirect to="/" /> :
                        <Component {...props} />
                )} />
            }
        </AuthUserContext.Consumer>
    );
};