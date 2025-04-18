import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isProtected }) => {
    const isAdmin = false; // can replace it with admin check logic 

    return isProtected && !isAdmin ? <Navigate to="/" replace /> : children;
};

export default ProtectedRoute;
