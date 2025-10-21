import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ManagerHome from '../Managers/ManagerHome';
import DashboardLayouts from '../DashboardLayouts/DashboardLayout';
import ManagerTicket from '../Managers/ManagerTicket';
import ManagerOwnTickets from '../Managers/ManagerOwnTickets';
import ManagerAssignTickets from '../Managers/ManagerAssignTickets';
import ManagerAgents from '../Managers/ManagerAgents';
import Dashboard from '../Agents/Dashboard';
import StoreDashboard from '../Stores/StoreDashboard';
import StoreCreateTickets from '../Stores/StoreCreateTickets';
import ManagerReviewTicketDetail from '../Managers/ManagerReviewTicketDetail';
import Stores from '../PublicPages/Stores';
import CamCredentails from '../PublicPages/CamCredentails';
import CameraStructure from '../PublicPages/CameraStructure';
import EmployeeContact from '../PublicPages/EmployeeContact';
import GroupEmail from '../PublicPages/GroupEmail';
import MMDMInfo from '../PublicPages/MMDMInfo';
import TrainingCropStores from '../PublicPages/TrainingCropStores';
import MemphisStructure from '../PublicPages/MemphisStructure';
import Login from '../PublicPages/Login';
// import { decodeToken } from '../Utils/decodedToken.utils';
import SuperAdminDashboard from '../SuperAdmin/SuperAdminDashboard';
import SuperAdminInsights from '../SuperAdmin/SuperAdminInsights';
import SuperAdminManageUser from '../SuperAdmin/SuperAdminManageUser';
import SuperAdminManageStores from '../SuperAdmin/SuperAdminManageStores';
import SuperAdminManageTickets from '../SuperAdmin/SuperAdminManageTickets';
import SuperAdminSetting from '../SuperAdmin/SuperAdminSetting';
import AgentReviewTickets from '../Agents/AgentReviewTickets';
import ManagerSpecificFilterationTotalTickets from '../Managers/ManagerSpecificFilterationTotalTickets';
import ManagerSpecificFilterationCloseTickets from '../Managers/ManagerSpecificFilterationCloseTickets';
import ManagerSpecificFilterationPendingTickets from '../Managers/ManagerSpecificFilterationPendingTickets';
import ManagerSpecificFilterationCompleteTickets from '../Managers/ManagerSpecificFilterationCompleteTickets';
import ManagerSpecificFilterationReopenTickets from '../Managers/ManagerSpecificFilterationReopenTickets';
import SupportImage from '../PublicPages/SupportImage';
import AgentOpenTickets from '../Agents/AgentOpenTickets';
import AgentClosedTickets from '../Agents/AgentClosedTickets';
import AgentCompleteTickets from '../Agents/AgentCompleteTickets';
import AgentPendingTickets from '../Agents/AgentPendingTickets';
import AgentReopenTickets from '../Agents/AgentReopenTickets';
import SuperAdminReviewTickets from '../SuperAdmin/SuperAdminReviewTickets';
import SuperAdminSettingLogs from '../SuperAdmin/SuperAdminSettingLogs';
import SuperAdminOpenTickts from '../SuperAdmin/SuperAdminOpenTickts';
import SuperAdminClosedTickts from '../SuperAdmin/SuperAdminClosedTickts';
import SuperAdminCompleteTickts from '../SuperAdmin/SuperAdminCompleteTickts';
import SuperAdminPendingTickts from '../SuperAdmin/SuperAdminPendingTickts';
import SuperAdminReopenTickts from '../SuperAdmin/SuperAdminReopenTickts';
import SuperAdminMMDMInfo from '../SuperAdmin/SuperAdminMMDMInfo';
import SuperAdminCamCredentails from '../SuperAdmin/SuperAdminCamCredentails';
import SuperAdminEmployeeContact from '../SuperAdmin/SuperAdminEmployeeContact';
import MarketManagerDashboard from '../MarketManagers/MarketManagerDashboard';
import MarketManagersManageTickets from '../MarketManagers/MarketManagersManageTickets';
import MarketManagerReviewTickets from '../MarketManagers/MarketManagerReviewTickets';
import DistrictManagerDashboard from '../DistrictManagers/DistrictManagerDashboard';
import DistrictManagerManageTickets from '../DistrictManagers/DistrictManagerManageTickets';
import DistrictManagerReviewTickets from '../DistrictManagers/DistrictManagerReviewTickets';
import AdminManagerDashboard from '../AdminSeniorManager/AdminManagerDashboard';
import AdminManagerManageTickets from '../AdminSeniorManager/AdminManagerManageTickets';
import AdminManagerReviewTickets from '../AdminSeniorManager/AdminManagerReviewTickets';
import AdminManagerOpenTickets from '../AdminSeniorManager/AdminManagerOpenTickets';
import AdminManagerClosedTickets from '../AdminSeniorManager/AdminManagerClosedTickets';
import AdminManagerCompleteTickets from '../AdminSeniorManager/AdminManagerCompleteTickets';
import AdminManagerPendingTickets from '../AdminSeniorManager/AdminManagerPendingTickets';
import AdminManagerReopenTickets from '../AdminSeniorManager/AdminManagerReopenTickets';
import MarketManagerOpenTickets from '../MarketManagers/MarketManagerOpenTickets';
import MarketManagerClosedTickets from '../MarketManagers/MarketManagerClosedTickets';
import MarketManagerCompleteTickets from '../MarketManagers/MarketManagerCompleteTickets';
import MarketManagerPendingTickets from '../MarketManagers/MarketManagerPendingTickets';
import MarketManagerReopenTickets from '../MarketManagers/MarketManagerReopenTickets';
import ResetPassword from '../PublicPages/ResetPassword';
import SeniorManagerDashboard from '../SeniorManager/SeniorManagerDashboard';
import SeniorManagerManageTickets from '../SeniorManager/SeniorManagerManageTickets';
import SenioeManagerAgents from '../SeniorManager/SenioeManagerAgents';
import SeniorManagerOpenTickets from '../SeniorManager/SeniorManagerOpenTickets';
import SeniorManagerCloseTickets from '../SeniorManager/SeniorManagerCloseTickets';
import SuperAdminMemphisStructure from '../SuperAdmin/SuperAdminMemphisStructure';
import BlanckPage from '../PublicPages/BlanckPage';
import SeniorManagerReviewTickets from '../SeniorManager/SeniorManagerReviewTickets';
import Chatsystem from '../ChatSystem/Chatsystem';
import ManagerAgentsDetail from '../Managers/ManagerAgentsDetail';
// import cookies from "js-cookie";
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';
import PublicRoute from '../Components/PublicRoute/PublicRoute';
import TestingWhatsappAPi from '../PublicPages/TestingWhatsappAPi';
import SuperAdminProblemsofCategory from '../SuperAdmin/SuperAdminProblemsofCategory';
import SuperAdminAllNotifications from '../SuperAdmin/SuperAdminAllNotifications';
import ForgetPassword from '../PublicPages/ForgetPassword';
import StoreReviewTickets from '../Stores/StoreReviewTickets';
import CreateUsersAccountFromExcel from '../PublicPages/CreateUsersAccountFromExcel';
import SuperAdminDeparmentsManagements from '../SuperAdmin/SuperAdminDeparmentsManagements';
// const ProtectedRoute = ({ children, allowedDepartments }) => {
//     const id = cookies.get("id");
//     const token = cookies.get("token");
//     if (!id || !token) {
//         return <Navigate to="/" replace />;
//     }
//     const decodedToken = decodeToken(token);
//     if (!decodedToken) {
//         return <Navigate to="/" replace />;
//     }
//     const userDepartment = decodedToken?.department;
//     const userSubDepartment = decodedToken?.subDepartment;
//     if (userSubDepartment === "Manager") {
//         return children;
//     } else if (userSubDepartment === "Agent") {
//         return children;
//     }
//     if (!allowedDepartments?.includes(userDepartment)) {
//         return <Navigate to="/" />;
//     }
//     return children;
// };

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path="/reset-password" element={
                    <ResetPassword />
                    // <PublicRoute>
                    // </PublicRoute>
                } />
                <Route path="/fogot-password" element={
                    <PublicRoute>
                        <ForgetPassword />
                    </PublicRoute>
                } />
                {/* <Route path="/create-users" element={
                        <CreateUsersAccountFromExcel />
                } /> */}
                <Route path="*" element={
                    <DashboardLayouts>
                        <Routes>
                            <Route path="/manager" element={<ProtectedRoute allowedDepartments={'Manager'}> <ManagerHome /></ProtectedRoute>} />
                            <Route path="/manager-create-ticket" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerTicket /></ProtectedRoute>} />
                            <Route path="/manager-open-ticket" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerSpecificFilterationTotalTickets /></ProtectedRoute>} />
                            <Route path="/manager-close-ticket" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerSpecificFilterationCloseTickets /></ProtectedRoute>} />
                            <Route path="/manager-pending-ticket" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerSpecificFilterationPendingTickets /></ProtectedRoute>} />
                            <Route path="/manager-complete-ticket" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerSpecificFilterationCompleteTickets /></ProtectedRoute>} />
                            <Route path="/manager-reopen-ticket" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerSpecificFilterationReopenTickets /></ProtectedRoute>} />
                            <Route path="/manager-review-ticket/:id" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerReviewTicketDetail /></ProtectedRoute>} />
                            <Route path="/manager-own-tickets" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerOwnTickets /></ProtectedRoute>} />
                            <Route path="/manager-assigned-tickets" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerAssignTickets /></ProtectedRoute>} />
                            <Route path="/manager-agents" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerAgents /></ProtectedRoute>} />
                            <Route path="/manager-review-agents/:id" element={<ProtectedRoute allowedDepartments={'Manager'}><ManagerAgentsDetail /></ProtectedRoute>} />
                            <Route path="/agent-dashboard" element={<ProtectedRoute allowedDepartments={'Agent'}><Dashboard /></ProtectedRoute>} />
                            <Route path="/agent-review-tickets/:id" element={<ProtectedRoute allowedDepartments={'Agent'}><AgentReviewTickets /></ProtectedRoute>} />
                            <Route path="/agent-open-ticket" element={<ProtectedRoute allowedDepartments={'Agent'}><AgentOpenTickets /></ProtectedRoute>} />
                            <Route path="/agent-close-ticket" element={<ProtectedRoute allowedDepartments={'Agent'}><AgentClosedTickets /></ProtectedRoute>} />
                            <Route path="/agent-complete-ticket" element={<ProtectedRoute allowedDepartments={'Agent'}><AgentCompleteTickets /></ProtectedRoute>} />
                            <Route path="/agent-pending-ticket" element={<ProtectedRoute allowedDepartments={'Agent'}><AgentPendingTickets /></ProtectedRoute>} />
                            <Route path="/agent-reopen-ticket" element={<ProtectedRoute allowedDepartments={'Agent'}><AgentReopenTickets /></ProtectedRoute>} />
                            <Route path="/store-dashboard" element={<ProtectedRoute allowedDepartments={ 'Store'}><StoreDashboard /></ProtectedRoute>} />
                            <Route path="/store-create-tickte" element={<ProtectedRoute allowedDepartments={ 'Store'}><StoreCreateTickets /></ProtectedRoute>} />
                            <Route path="/store-reviews-tickte/:id" element={<ProtectedRoute allowedDepartments={ 'Store'}><StoreReviewTickets /></ProtectedRoute>} />
                            <Route path="/senior-managers-dashboard" element={<ProtectedRoute allowedDepartments={'Senior Manager'}><SeniorManagerDashboard /></ProtectedRoute>} />
                            <Route path="/senior-managers-manage-tickets" element={<ProtectedRoute allowedDepartments={'Senior Manager'}><SeniorManagerManageTickets /></ProtectedRoute>} />
                            <Route path="/senior-managers-reviews-tickets/:id" element={<ProtectedRoute allowedDepartments={'Senior Manager'}><SeniorManagerReviewTickets /></ProtectedRoute>} />
                            <Route path="/senior-managers-departments" element={<ProtectedRoute allowedDepartments={'Senior Manager'}><SeniorManagerDashboard /></ProtectedRoute>} />
                            <Route path="/senior-managers-agents" element={<ProtectedRoute allowedDepartments={'Senior Manager'}><SenioeManagerAgents /></ProtectedRoute>} />
                            <Route path="/senior-managers-review-open-tickets" element={<ProtectedRoute allowedDepartments={'Senior Manager'}><SeniorManagerOpenTickets /></ProtectedRoute>} />
                            <Route path="/senior-managers-review-close-tickets" element={<ProtectedRoute allowedDepartments={'Senior Manager'}><SeniorManagerCloseTickets /></ProtectedRoute>} />
                            <Route path="/senior-managers-dashboard" element={<ProtectedRoute allowedDepartments={'Senior Manager'}><SeniorManagerDashboard /></ProtectedRoute>} />
                            <Route path="/senior-managers-dashboard" element={<ProtectedRoute allowedDepartments={'Senior Manager'}><SeniorManagerDashboard /></ProtectedRoute>} />
                            <Route path="/public-stores" element={<Stores />} />
                            <Route path="/public-cam-credentails" element={<CamCredentails />} />
                            <Route path="/public-camera-structure" element={<CameraStructure />} />
                            <Route path="/public-employee-contact" element={<EmployeeContact />} />
                            <Route path="/public-group-email" element={<GroupEmail />} />
                            <Route path="/public-mmdm-info" element={<MMDMInfo />} />
                            <Route path="/public-training-crop-stores" element={<TrainingCropStores />} />
                            <Route path="/public-memphis-structure" element={<MemphisStructure />} />
                            <Route path="/public-support" element={<SupportImage />} />
                            <Route path="/public-not-found" element={<BlanckPage />} />
                            <Route path="/superAdminHome" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminDashboard /></ProtectedRoute>} />
                            <Route path="/superAdmin-manage-tickets" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminManageTickets /></ProtectedRoute>} />
                            <Route path="/superAdmin-review-tickets/:id" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminReviewTickets /></ProtectedRoute>} />
                            <Route path="/superAdmin-manage-stores" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminManageStores /></ProtectedRoute>} />
                            <Route path="/superAdmin-manage-users" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminManageUser /></ProtectedRoute>} />
                            <Route path="/superAdmin-manage-insights" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminInsights /></ProtectedRoute>} />
                            <Route path="/superAdmin-manage-setting" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminSetting /></ProtectedRoute>} />
                            <Route path="/superAdmin-logs-setting" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminSettingLogs /></ProtectedRoute>} />
                            <Route path="/superAdmin-category-problems" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminProblemsofCategory /></ProtectedRoute>} />
                            <Route path="/superAdmin-managements-departments" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminDeparmentsManagements /></ProtectedRoute>} />
                            <Route path="/superAdmin-open-tickets" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminOpenTickts /></ProtectedRoute>} />
                            <Route path="/superAdmin-close-tickets" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminClosedTickts /></ProtectedRoute>} />
                            <Route path="/superAdmin-complete-tickets" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminCompleteTickts /></ProtectedRoute>} />
                            <Route path="/superAdmin-pending-tickets" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminPendingTickts /></ProtectedRoute>} />
                            <Route path="/superAdmin-reopen-tickets" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminReopenTickts /></ProtectedRoute>} />
                            <Route path="/superAdmin-manage-mm-dm" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminMMDMInfo /></ProtectedRoute>} />
                            <Route path="/superAdmin-manage-cam-credentials" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminCamCredentails /></ProtectedRoute>} />
                            <Route path="/superAdmin-manage-employee-contact" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminEmployeeContact /></ProtectedRoute>} />
                            <Route path="/superAdmin-manage-memphis-structure" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminMemphisStructure /></ProtectedRoute>} />
                            <Route path="/superAdmin-manage-all-notifications" element={<ProtectedRoute allowedDepartments={'SuperAdmin'}><SuperAdminAllNotifications /></ProtectedRoute>} />
                            <Route path="/market-manager-dashboard" element={<ProtectedRoute allowedDepartments={'Market Manager'}><MarketManagerDashboard /></ProtectedRoute>} />
                            <Route path="/market-manager-manage-ticket" element={<ProtectedRoute allowedDepartments={'Market Manager'}><MarketManagersManageTickets /></ProtectedRoute>} />
                            <Route path="/market-manager-review-ticket/:id" element={<ProtectedRoute allowedDepartments={'Market Manager'}><MarketManagerReviewTickets /></ProtectedRoute>} />
                            <Route path="/market-manager-district-managers" element={<ProtectedRoute allowedDepartments={'Market Manager'}><MarketManagerDashboard /></ProtectedRoute>} />
                            <Route path="/market-manager-stores" element={<ProtectedRoute allowedDepartments={'Market Manager'}><MarketManagerDashboard /></ProtectedRoute>} />
                            <Route path="/market-manager-review-open-ticket" element={<ProtectedRoute allowedDepartments={'Market Manager'}><MarketManagerOpenTickets /></ProtectedRoute>} />
                            <Route path="/market-manager-review-close-ticket" element={<ProtectedRoute allowedDepartments={'Market Manager'}><MarketManagerClosedTickets /></ProtectedRoute>} />
                            <Route path="/market-manager-review-complete-ticket" element={<ProtectedRoute allowedDepartments={'Market Manager'}><MarketManagerCompleteTickets /></ProtectedRoute>} />
                            <Route path="/market-manager-review-pending-ticket" element={<ProtectedRoute allowedDepartments={'Market Manager'}><MarketManagerPendingTickets /></ProtectedRoute>} />
                            <Route path="/market-manager-review-reopen-ticket" element={<ProtectedRoute allowedDepartments={'Market Manager'}><MarketManagerReopenTickets /></ProtectedRoute>} />
                            <Route path="/district-manager-dashboard" element={<ProtectedRoute allowedDepartments={'District Manager'}><DistrictManagerDashboard /></ProtectedRoute>} />
                            <Route path="/district-manager-manage-ticket" element={<ProtectedRoute allowedDepartments={'District Manager'}><DistrictManagerManageTickets /></ProtectedRoute>} />
                            <Route path="/district-manager-review-ticket/:id" element={<ProtectedRoute allowedDepartments={'District Manager'}><DistrictManagerReviewTickets /></ProtectedRoute>} />
                            <Route path="/admin-manager-dashboard" element={<ProtectedRoute allowedDepartments={'Admin Manager'}><AdminManagerDashboard /></ProtectedRoute>} />
                            <Route path="/admin-manager-manage-ticket" element={<ProtectedRoute allowedDepartments={'Admin Manager'}><AdminManagerManageTickets /></ProtectedRoute>} />
                            <Route path="/admin-manager-review-ticket/:id" element={<ProtectedRoute allowedDepartments={'Admin Manager'}><AdminManagerReviewTickets /></ProtectedRoute>} />
                            <Route path="/admin-manager-review-open-ticket" element={<ProtectedRoute allowedDepartments={'Admin Manager'}><AdminManagerOpenTickets /></ProtectedRoute>} />
                            <Route path="/admin-manager-review-close-ticket" element={<ProtectedRoute allowedDepartments={'Admin Manager'}><AdminManagerClosedTickets /></ProtectedRoute>} />
                            <Route path="/admin-manager-review-complete-ticket" element={<ProtectedRoute allowedDepartments={'Admin Manager'}><AdminManagerCompleteTickets /></ProtectedRoute>} />
                            <Route path="/admin-manager-review-pending-ticket" element={<ProtectedRoute allowedDepartments={'Admin Manager'}><AdminManagerPendingTickets /></ProtectedRoute>} />
                            <Route path="/admin-manager-review-reopen-ticket" element={<ProtectedRoute allowedDepartments={'Admin Manager'}><AdminManagerReopenTickets /></ProtectedRoute>} />
                        </Routes>
                    </DashboardLayouts>
                } />
                <Route path="/chat-system" element={<Chatsystem />} />
                <Route path="/chat-system/:id" element={<Chatsystem />} />
                <Route path="/testing" element={<TestingWhatsappAPi />} />
            </Routes>
        </Router>
    );
}

export default Routing;
