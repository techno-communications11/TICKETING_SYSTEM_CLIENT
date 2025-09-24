// // // // // import React from 'react';
// // // // // import { Navigate } from 'react-router-dom';
// // // // // import Cookies from 'js-cookie';
// // // // // import { decodeToken } from 'react-jwt';

// // // // // const ProtectedRoute = ({ children, allowedDepartments }) => {
// // // // //     const token = Cookies.get('token');
// // // // //     const id = Cookies.get('id');
// // // // //     const decodedToken = token ? decodeToken(token) : null;

// // // // //     // Agar token ya id na ho → redirect to login
// // // // //     if (token && id && decodedToken) {
// // // // //         return <Navigate to="/" replace />;
// // // // //     }

// // // // //     // Optional: Department based restriction
// // // // //     const userDepartment = decodedToken?.department;
// // // // //     const userSubDepartment = decodedToken?.subDepartment;

// // // // //     if (userSubDepartment === "Manager" || userSubDepartment === "Agent") {
// // // // //         return children;
// // // // //     }

// // // // //     if (allowedDepartments && !allowedDepartments.includes(userDepartment)) {
// // // // //         return <Navigate to="/" replace />;
// // // // //     }

// // // // //     return children;
// // // // // };

// // // // // export default ProtectedRoute;


// // // // import React from 'react';
// // // // import { Navigate } from 'react-router-dom';
// // // // import Cookies from 'js-cookie';
// // // // import { decodeToken } from 'react-jwt';

// // // // const ProtectedRoute = ({ children, allowedDepartments }) => {
// // // //     const token = Cookies.get('token');
// // // //     const id = Cookies.get('id');
// // // //     // console.log("Invalid Token",token,id)
// // // //     // Agar token ya id missing → redirect login
// // // //     if (!token && !id) {
// // // //         return <Navigate to="/" replace />;
// // // //     }

// // // //     // Decode token safely
// // // //     const decodedToken = token ? decodeToken(token) : null;

// // // //     // Agar token invalid ho → redirect login
// // // //     if (!decodedToken) {
// // // //         return <Navigate to="/" replace />;
// // // //     }

// // // //     // Optional: Department/SubDepartment check
// // // //     const { department, subDepartment } = decodedToken;

// // // //     // Agar user "Manager" ya "Agent" hai → allow
// // // //     if (subDepartment === "Manager" || subDepartment === "Agent") {
// // // //         return children;
// // // //     }

// // // //     // Agar allowedDepartments define kiye ho → check karo
// // // //     if (allowedDepartments && !allowedDepartments.includes(department)) {
// // // //         return <Navigate to="/" replace />;
// // // //     }

// // // //     return children;
// // // // };

// // // // export default ProtectedRoute;


// // // import React from 'react';
// // // import { Navigate } from 'react-router-dom';
// // // import Cookies from 'js-cookie';
// // // import { decodeToken } from 'react-jwt';
// // // import { isAuthenticated } from '../../Utils/auth';

// // // const ProtectedRoute = ({ children, allowedDepartments }) => {
// // //     const token = Cookies.get('token');
// // //     const id = Cookies.get('id');

// // //     // Agar token ya id missing → redirect login
// // //     if (!isAuthenticated()) {
// // //         return <Navigate to="/" replace />;
// // //     }

// // //     // // Decode token safely
// // //     // let decodedToken = null;
// // //     // try {
// // //     //     decodedToken = decodeToken(token);
// // //     // } catch (error) {
// // //     //     // Invalid token → redirect login
// // //     //     return <Navigate to="/" replace />;
// // //     // }

// // //     // // Agar token decode nahi hua → redirect
// // //     // if (!decodedToken) {
// // //     //     return <Navigate to="/" replace />;
// // //     // }

// // //     const { department, subDepartment } = decodeToken(token);

// // //     // Agar subDepartment "Manager" ya "Agent" hai → allow
// // //     if (subDepartment === "Manager" || subDepartment === "Agent") {
// // //         return children;
// // //     }

// // //     // Agar allowedDepartments define ho → check karo
// // //     if (allowedDepartments && !allowedDepartments.includes(department)) {
// // //         return <Navigate to="/" replace />;
// // //     }

// // //     return children;
// // // };

// // // export default ProtectedRoute;


// // import React from 'react';
// // import { Navigate } from 'react-router-dom';
// // import Cookies from 'js-cookie';
// // import { decodeToken } from 'react-jwt';
// // import { isAuthenticated } from '../../Utils/auth';

// // const ProtectedRoute = ({ children, allowedDepartments }) => {
// //     const token = Cookies.get('token');
// //     const id = Cookies.get('id');

// //     // Agar login nahi hai
// //     if (!isAuthenticated()) {
// //         return <Navigate to="/" replace />;
// //     }

// //     let decodedToken = null;
// //     try {
// //         decodedToken = decodeToken(token);
// //     } catch (error) {
// //         return <Navigate to="/" replace />;
// //     }

// //     if (!decodedToken) {
// //         return <Navigate to="/" replace />;
// //     }

// //     const { department, subDepartment, first } = decodedToken;

// //     // ✅ Naya check: Agar password reset pending hai
// //     if (first === false) {
// //         return <Navigate to="/reset-password" replace />;
// //     }

// //     // Agar subDepartment "Manager" ya "Agent" hai → allow
// //     if (subDepartment === "Manager" || subDepartment === "Agent") {
// //         return children;
// //     }

// //     // Agar allowedDepartments diye gaye hain → check karo
// //     if (allowedDepartments && !allowedDepartments.includes(department)) {
// //         return <Navigate to="/" replace />;
// //     }

// //     return children;
// // };

// // export default ProtectedRoute;



// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { decodeToken } from 'react-jwt';
// import { isAuthenticated } from '../../Utils/auth';

// const ProtectedRoute = ({ children, allowedDepartments }) => {
//     const token = Cookies.get('token');
//     const id = Cookies.get('id');

//     // Agar login nahi hai
//     if (!isAuthenticated()) {
//         return <Navigate to="/" replace />;
//     }

//     let decodedToken = null;
//     try {
//         decodedToken = decodeToken(token);
//     } catch (error) {
//         return <Navigate to="/" replace />;
//     }

//     if (!decodedToken) {
//         return <Navigate to="/" replace />;
//     }

//     const { department, subDepartment, first } = decodedToken;

//     // ✅ Naya check: Agar password reset pending hai
//     if (first === false) {
//         return <Navigate to="/reset-password" replace />;
//     }

//     // Agar subDepartment "Manager" ya "Agent" hai → allow
//     if (subDepartment === "Manager" || subDepartment === "Agent") {
//         return children;
//     }

//     // Agar allowedDepartments diye gaye hain → check karo
//     if (allowedDepartments && !allowedDepartments.includes(department)) {
//         return <Navigate to="/" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;




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
    if (subDepartment === "Manager" || subDepartment === "Agent") {
        return children;
    }

    // Agar allowedDepartments diye gaye hain → check karo
    if (allowedDepartments && !allowedDepartments.includes(department)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
