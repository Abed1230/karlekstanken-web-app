import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthUserConsumer } from './contexts/AuthUserContext';
import MyStrings from './MyStrings';

export const PrivateRoute = ({ component: Component, title, ...rest }) => {
    if (title)
        window.document.title = MyStrings.appName + " - " + title;
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <AuthUserConsumer>
            {authUser =>
                <Route {...rest} render={props => (
                    authUser ?
                        <Component {...props} />
                        : <Redirect to="/" />
                )} />
            }
        </AuthUserConsumer>
    );
};

export const PublicRoute = ({ component: Component, restricted, title, ...rest }) => {
    if (title)
        window.document.title = MyStrings.appName + " - " + title;
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <AuthUserConsumer>
            {authUser =>
                <Route {...rest} render={props => (
                    authUser && restricted ?
                        <Redirect to="/" /> :
                        <Component {...props} />
                )} />
            }
        </AuthUserConsumer>
    );
};