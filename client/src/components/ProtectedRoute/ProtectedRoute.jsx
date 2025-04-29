import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utilis/authutills";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = isAuthenticated();

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />
    }

    return children;
};

export default ProtectedRoute;
