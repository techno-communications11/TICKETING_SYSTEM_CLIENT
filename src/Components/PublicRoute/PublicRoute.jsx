// import React from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { decodeToken } from 'react-jwt';
// import { jwtDecode } from 'jwt-decode';

// const PublicRoute = ({ children }) => {
//     const token = Cookies.get('token');
//     const id = Cookies.get('id');
//     const decodedToken = token ? decodeToken(token) : null;
//     const navigate = useNavigate()
//     const { department, subDepartment } = jwtDecode(token);

//     // Agar login ho chuka hai → redirect dashboard/home
//     if (token && id && decodedToken) {
//         const departmentRoutes = {
//             Sales: "/store-dashboard",
//             "Admin Manager": "/admin-manager-dashboard",
//             "Senior Manager": "/senior-managers-dashboard",
//             "District Manager": "/district-manager-dashboard",
//             "Market Manager": "/market-manager-dashboard",
//             SuperAdmin: "/superAdminHome",
//         };
//         if (departmentRoutes[department]) {
//             return navigate(departmentRoutes[department]);;
//         }
//         if (subDepartment === "Manager") {
//             return <Navigate to="/manager" replace />;
//         } else if (subDepartment === "Agent") {
//             return <Navigate to="/agent-dashboard" replace />;
//         } else {
//             return <Navigate to="/departmenthome" replace />;
//         }

//     }

//     return children; // Agar login nahi → show login page
// };

// export default PublicRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';

const PublicRoute = ({ children }) => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    // Token aur ID exist karte hain to decode karenge
    let decodedToken = null;
    if (token && typeof token === 'string') {
        decodedToken = decodeToken(token);
    }

    // Agar login ho chuka hai → redirect dashboard/home
    if (token && id && decodedToken) {
        const { department, subDepartment } = decodedToken;

        const departmentRoutes = {
            Sales: "/store-dashboard",
            "Admin Manager": "/admin-manager-dashboard",
            "Senior Manager": "/senior-managers-dashboard",
            "District Manager": "/district-manager-dashboard",
            "Market Manager": "/market-manager-dashboard",
            SuperAdmin: "/superAdminHome",
        };

        if (departmentRoutes[department]) {
            return <Navigate to={departmentRoutes[department]} replace />;
        }
        if (subDepartment === "Manager") {
            return <Navigate to="/manager" replace />;
        } else if (subDepartment === "Agent") {
            return <Navigate to="/agent-dashboard" replace />;
        } else {
            return <Navigate to="/departmenthome" replace />;
        }
    }

    return children; // Agar login nahi → show login page
};

export default PublicRoute;
