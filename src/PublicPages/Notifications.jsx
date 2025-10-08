import React from 'react';
import { decodeToken } from '../Utils/decodedToken.utils';
import ManagerNotification from '../Managers/ManagerNotification';
import AgentNotification from '../Agents/AgentNotification';
import SperAdminNotification from '../SuperAdmin/SperAdminNotification';
import AdminManagerNotification from '../AdminSeniorManager/AdminManagerNotification';
import MarketManagerNotifications from '../MarketManagers/MarketManagerNotifications';
import DistrictManagerNotification from '../DistrictManagers/DistrictManagerNotification';
import SeniorManagerNotifications from '../SeniorManager/SeniorManagerNotifications';

function Notifications() {
    const { department, subDepartment } = decodeToken() || {};

    const normalizedSubDept = subDepartment?.toLowerCase();
    const normalizedSubDept1 = department?.toLowerCase();

    if (normalizedSubDept === 'manager') {
        return <ManagerNotification />;
    }
    if (normalizedSubDept1 === 'superadmin') {
        return <SperAdminNotification />;
    }
    if (normalizedSubDept === 'agent') {
        return <AgentNotification />;
    }
    if (normalizedSubDept1 === 'market manager') {
        return <MarketManagerNotifications />;
    }
    if (normalizedSubDept1 === 'district manager') {
        return <DistrictManagerNotification />;
    }
    if (normalizedSubDept1 === 'admin manager') {
        return <AdminManagerNotification />;
    }
    if (normalizedSubDept1 === 'senior manager') {
        return <SeniorManagerNotifications />;
    }

    return (
        <div style={{ padding: '1rem', color: '#888' }}>
            {/* No notifications available for your role. */}
        </div>
    );
}

export default Notifications;
