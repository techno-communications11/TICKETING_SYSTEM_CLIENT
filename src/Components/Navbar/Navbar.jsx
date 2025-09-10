import { Typography } from '@mui/material';
import React from 'react';
import { decodeToken } from '../../Utils/decodedToken.utils';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const decodedTickets = decodeToken();
    const id = cookie.get('id');
    const navigate = useNavigate();

    const { department, subDepartment } = decodedTickets || {};
    const homeRoute =
        department === "SuperAdmin"
            ? "/superAdminHome" :
            department === "Admin Manager"
                ? "/admin-manager-dashboard"
                : department === "District Manager"
                    ? "/district-manager-dashboard"
                    : department === "Market Manager"
                        ? "/market-manager-dashboard"
                        : department === "Internal"
                            ? "/admincreateticket"
                            : subDepartment === "Manager"
                                ? "/manager"
                                : subDepartment === "Agent"
                                    ? "/agent-dashboard"
                                    : "/";

    const handleLogoClick = () => {
        navigate(homeRoute);
    };

    return (
        <div>
            <Typography
                variant="h6"
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={handleLogoClick}
            >
                TECHNO COMMUNICATIONS LLC
            </Typography>
        </div>
    );
}

export default Navbar;
