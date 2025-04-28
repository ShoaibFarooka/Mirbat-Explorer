import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utilis/authutills';

const AuthenticatedRedirect = ({ children, ...rest }) => {
    const location = useLocation();
    const isAuth = isAuthenticated();

    if (isAuth) {
        return <Navigate to="/admin/dashboard" replace state={{ from: location }} />;
    }

    return React.cloneElement(children, { ...rest });
};

export default AuthenticatedRedirect;