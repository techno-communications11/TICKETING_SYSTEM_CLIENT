import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { isAuthenticated } from '../../Utils/auth';

const ProtectedRoute = ({ children, allowedDepartments }) => {
    const token = Cookies.get('token');
    const location = useLocation();

    // Agar login hi nahi hai
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }

    let decodedToken = null;
    try {
        decodedToken = decodeToken(token);
    } catch (error) {
        return <Navigate to="/" replace />;
    }

    if (!decodedToken) {
        return <Navigate to="/" replace />;
    }

    const { department, subDepartment, first } = decodedToken;

    // ✅ Naya logic
    if (first === false) {
        // Sirf /reset-password allow karo
        if (location.pathname !== "/reset-password") {
            return <Navigate to="/reset-password" replace />;
        }
    }

    // Agar subDepartment "Manager" ya "Agent" hai → allow
    if (subDepartment === "Manager" || subDepartment === "Agent" || subDepartment === "SuperAdmin") {
        return children;
    }

    // Agar allowedDepartments diye gaye hain → check karo
    if (allowedDepartments && !allowedDepartments.includes(department || subDepartment)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
