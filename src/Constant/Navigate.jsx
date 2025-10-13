// navigation.js

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory2';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'; // 🎫 Single Ticket icon
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import StoreIcon from '@mui/icons-material/Store'; // For stores
import PeopleIcon from '@mui/icons-material/People'; // For users
import BarChartIcon from '@mui/icons-material/BarChart'; // For insights
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HistoryIcon from "@mui/icons-material/History";
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
// import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

export const NAVIGATION = [
  {
    title: 'Dashboard',
    segment: 'manager',
    icon: <DashboardIcon />,
    roles: ['manager'],
  },

  {
    title: 'Manage Ticket',
    segment: 'manager-create-ticket',
    icon: <ConfirmationNumberIcon />,
    roles: ['manager'],
  },
  {
    title: 'Own Tickets',
    segment: 'manager-own-tickets',
    icon: <InventoryIcon />,
    roles: ['manager'],
  },
  {
    title: 'Assigned Tickets',
    segment: 'manager-assigned-tickets',
    icon: <SupportAgentIcon />,
    roles: ['manager'],
  },
  {
    title: 'Agents',
    segment: 'manager-agents',
    icon: <ChatBubbleOutlineIcon />,
    roles: ['manager'],
  },
  {
    title: 'Dashboard',
    segment: 'agent-dashboard',
    icon: <DashboardIcon />,
    roles: ['agent'],
  },
  {
    title: 'Dashboard',
    segment: 'store-dashboard',
    icon: <DashboardIcon />,
    roles: ['store'],
  },
  {
    title: 'Create Ticket',
    segment: 'store-create-tickte',
    icon: <ConfirmationNumberIcon />,
    roles: ['store'],
  },
  {
    title: 'Super Admin Dashboard',
    segment: 'superAdminHome',
    icon: <DashboardIcon />,
    roles: ['superadmin'],
  },
  {
    title: 'Manage Ticket',
    segment: 'superAdmin-manage-tickets',
    icon: <ConfirmationNumberIcon />,
    roles: ['superadmin'],
  },
  {
    title: 'Manage Stores',
    segment: 'superAdmin-manage-stores',
    icon: <StoreIcon />,
    roles: ['superadmin'],
  },
  {
    title: 'Manager Users',
    segment: 'superAdmin-manage-users',
    icon: <PeopleIcon />,
    roles: ['superadmin'],
  },
  {
    title: 'Insights',
    segment: 'superAdmin-manage-insights',
    icon: <BarChartIcon />,
    roles: ['superadmin'],
  },
  {
    title: 'Category of Problems',
    segment: 'superAdmin-category-problems',
    icon: <AccountTreeIcon />,
    roles: ['superadmin'],
  },
  {
    title: 'Notification History',
    segment: 'superAdmin-manage-all-notifications',
    icon: <NotificationsNoneRoundedIcon />,
    roles: ['superadmin'],
  },
  {
    title: 'Settings',
    segment: 'superAdmin-manage-setting',
    icon: <SettingsIcon />,
    roles: ['superadmin'],
  },
  // 
  {
    title: 'Logs',
    segment: 'superAdmin-logs-setting',
    icon: <HistoryIcon />,
    roles: ['superadmin'],
  },
  {
    title: 'Dashboard',
    segment: 'market-manager-dashboard',
    icon: <DashboardIcon />,
    roles: ['market manager'],
  },
  {
    title: 'Manage Ticket',
    segment: 'market-manager-manage-ticket',
    icon: <ConfirmationNumberIcon />,
    roles: ['market manager'],
  },
  // {
  //   title: 'District Managers',
  //   segment: 'market-manager-district-managers',
  //   icon: <DashboardIcon />,
  //   roles: ['market manager'],
  // },
  // {
  //   title: 'Stores',
  //   segment: 'market-manager-stores',
  //   icon: <DashboardIcon />,
  //   roles: ['market manager'],
  // },
  {
    title: 'Dashboard',
    segment: 'district-manager-dashboard',
    icon: <DashboardIcon />,
    roles: ['district manager'],
  },
  {
    title: 'Manage Ticket',
    segment: 'district-manager-manage-ticket',
    icon: <ConfirmationNumberIcon />,
    roles: ['district manager'],
  },
  {
    title: 'Dashboard',
    segment: 'admin-manager-dashboard',
    icon: <DashboardIcon />,
    roles: ['admin manager'],
  },
  {
    title: 'Manage Ticket',
    segment: 'admin-manager-manage-ticket',
    icon: <ConfirmationNumberIcon />,
    roles: ['admin manager'],
  },
  {
    title: 'Dashboard',
    segment: 'senior-managers-dashboard',
    icon: <DashboardIcon />,
    roles: ['senior manager'],
  },
  {
    title: 'Manage Ticket',
    segment: 'senior-managers-manage-tickets',
    icon: <ConfirmationNumberIcon />,
    roles: ['senior manager'],
  },
  // {
  //   title: 'Departments',
  //   segment: 'senior-managers-departments',
  //   icon: <DashboardIcon />,
  //   roles: ['senior manager'],
  // },
  {
    title: 'Agents',
    segment: 'senior-managers-agents',
    icon: <GroupIcon />,
    roles: ['senior manager'],
  },
  {
    title: 'Market Structure',
    segment: '',
    icon: <InfoOutlineIcon />,
    roles: ['superadmin'],
    type: 'dropdown',
    children: [
      {
        title: 'Stores',
        segment: 'public-stores',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'MM / DM Info',
        segment: 'superAdmin-manage-mm-dm',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Cam Credentails',
        segment: 'superAdmin-manage-cam-credentials',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Employee Contact',
        segment: 'superAdmin-manage-employee-contact',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Training & Crop Stores',
        segment: 'public-training-crop-stores',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Memphis Structure',
        segment: 'superAdmin-manage-memphis-structure',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Removed Stores',
        segment: 'manager-assigned-tickets',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'New Stores In pipline',
        segment: 'manager-assigned-tickets',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Camera Structure',
        segment: 'public-camera-structure',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Group Emails',
        segment: 'public-group-email',
        icon: <InfoOutlineIcon />, // Updated icon
      },
    ],
  },
  {
    title: 'Market Structure',
    segment: '',
    icon: <InfoOutlineIcon />,
    roles: ['manager', 'agent', 'Sales', 'senior manager', 'district manager', 'market manager'],
    type: 'dropdown',
    children: [
      {
        title: 'Stores',
        segment: 'public-stores',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'MM / DM Info',
        segment: 'public-mmdm-info',
        icon: <InfoOutlineIcon />, // Updated icon
      },
      {
        title: 'Training & Crop Stores',
        segment: 'public-training-crop-stores',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Cam Credentails',
        segment: 'public-cam-credentails',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Employee Contact',
        segment: 'public-employee-contact',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Memphis Structure',
        segment: 'public-memphis-structure',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Removed Stores',
        segment: 'public-not-found',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'New Stores In pipline',
        segment: 'public-not-found',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Camera Structure',
        segment: 'public-not-found',
        icon: <InfoOutlineIcon />,
      },
      {
        title: 'Group Emails',
        segment: 'public-not-found',
        icon: <InfoOutlineIcon />, // Updated icon
      },
    ],
  },
  // {
  //   title: 'BRS Reports',
  //   segment: '',
  //   icon: <InfoOutlineIcon />,
  //   roles: ['senior manager'],
  //   type: 'dropdown',
  //   children: [
  //     {
  //       title: 'Dashboard',
  //       segment: '',
  //       icon: <InfoOutlineIcon />,
  //     },
  //     {
  //       title: 'Market Summary',
  //       segment: '',
  //       icon: <InfoOutlineIcon />, // Updated icon
  //     },
  //     {
  //       title: 'BRS Summary',
  //       segment: '',
  //       icon: <InfoOutlineIcon />,
  //     },
  //     {
  //       title: 'BRS-OPS',
  //       segment: '',
  //       icon: <InfoOutlineIcon />,
  //     },
  //     {
  //       title: 'BRS-COLL',
  //       segment: '',
  //       icon: <InfoOutlineIcon />,
  //     },
  //     {
  //       title: 'Capital-1',
  //       segment: '',
  //       icon: <InfoOutlineIcon />,
  //     },
  //     {
  //       title: 'Bank QB',
  //       segment: '',
  //       icon: <InfoOutlineIcon />,
  //     },
  //     {
  //       title: 'JV',
  //       segment: '',
  //       icon: <InfoOutlineIcon />,
  //     },
  //     {
  //       title: 'Utility Account',
  //       segment: '',
  //       icon: <InfoOutlineIcon />,
  //     }
  //   ],
  // },
];
