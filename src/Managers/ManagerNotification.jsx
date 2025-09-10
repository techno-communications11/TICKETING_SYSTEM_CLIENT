// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
//   Box,
//   Divider,
//   ListItemText,
//   Badge,
// } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { getAllNotificationsServices } from '../Services/notifications.services';
// import { getAllUsers } from '../Services/auth.services';
// import cookies from 'js-cookie';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { toast } from 'react-toastify';
// import { useSocket } from '../Context/socket.context';
// import { useNavigate } from 'react-router-dom';

// dayjs.extend(relativeTime);

// const ICON_URL = "https://ticketing-systems-five.vercel.app/logo.webp";

// const notificationTemplates = {
//   "new Ticket open": {
//     title: "🎫 New Ticket Opened",
//     getDescription: (id) => `Ticket ${id} has just been created. Please review.`,
//     toast: (id) => toast.info(`New Ticket Opened: ${id}`),
//   },
//   "assign to agent": {
//     title: "👤 Ticket Assigned to Agent",
//     getDescription: (id) => `Ticket ${id} is now assigned to an agent.`,
//     toast: (id) => toast.success(`Ticket ${id} assigned to agent.`),
//   },
//   "assign to manager": {
//     title: "🗂️ Ticket Assigned to You",
//     getDescription: (id) => `You have been assigned ticket ${id}.`,
//     toast: (id) => toast.success(`New Ticket Assigned: ${id}`),
//   },
//   "complete ticket": {
//     title: "✅ Ticket Completed",
//     getDescription: (id) => `Ticket ${id} has been resolved by the agent.`,
//     toast: (id) => toast.success(`Ticket Completed: ${id}`),
//   },
//   "approved by market manager": {
//     title: "🟢 Approved by Market Manager",
//     getDescription: (id) => `Ticket ${id} approved by Market Manager.`,
//     toast: (id) => toast.success(`Market Approved: ${id}`),
//   },
//   "denied by market manager": {
//     title: "🔴 Denied by Market Manager",
//     getDescription: (id) => `Ticket ${id} denied by Market Manager.`,
//     toast: (id) => toast.error(`Market Denied: ${id}`),
//   },
//   "approved by district manager": {
//     title: "✅ District Approval",
//     getDescription: (id) => `Ticket ${id} approved by District Manager.`,
//     toast: (id) => toast.success(`District Approved: ${id}`),
//   },
//   "denied by district manager": {
//     title: "⛔ District Denied",
//     getDescription: (id) => `Ticket ${id} denied by District Manager.`,
//     toast: (id) => toast.error(`District Denied: ${id}`),
//   },
//   "ticket review": {
//     title: "🔍 Ticket Under Review",
//     getDescription: (id) => `Ticket ${id} has been submitted for review.`,
//     toast: (id) => toast.info(`Ticket Under Review: ${id}`),
//   },
//   "ticket closed": {
//     title: "🔒 Ticket Closed",
//     getDescription: (id, closed_by) => `Ticket ${id} closed by ${closed_by}.`,
//     toast: (id) => toast.success(`Ticket Closed: ${id}`),
//   },
//   "ticket Re-open": {
//     title: "🔓 Ticket Reopened",
//     getDescription: (id, closed_by) => `Ticket ${id} was reopened by ${closed_by}.`,
//     toast: (id) => toast.info(`Ticket Reopened: ${id}`),
//   },
// };

// function ManagerNotification() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const id = cookies.get('id');
//   const [notifications, setNotifications] = useState([]);
//   const { socket } = useSocket();
//   const navigate = useNavigate();
//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const fetchNotifications = useCallback(async () => {
//     try {
//       const [resNoti, resUsers] = await Promise.all([
//         getAllNotificationsServices(),
//         getAllUsers(),
//       ]);

//       const currentUser = resUsers.data.data.find((u) => u.id === id);
//       if (!currentUser || !resNoti.data?.data) return;
//       console.log(resNoti.data.data)
//       const filtered = resNoti.data.data
//         .filter((n) => n.manager === id)
//         .map((n) => {
//           const template = notificationTemplates[n.notification_type];
//           const title = template?.title || "🔔 Notification";
//           const description = template?.getDescription(n.ticket_Id, n.closed_by) || "You have a new update.";

//           return {
//             id: n.id,
//             ticket_Id: n.ticket_Id,
//             title,
//             description,
//             time: dayjs(n.createdAt).fromNow(),
//             createdAt: new Date(n.createdAt).getTime(),
//           };
//         });

//       setNotifications(filtered.sort((a, b) => b.createdAt - a.createdAt));
//     } catch (error) {
//       console.error("❌ Failed to fetch notifications:", error.message);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchNotifications();
//   }, [fetchNotifications]);

//   const triggerBrowserNotification = async (title, description) => {
//     if ('Notification' in window && Notification.permission === 'granted') {
//       new Notification(title, {
//         body: description,
//         icon: ICON_URL,
//       });
//     }
//   };

//   const requestNotificationPermission = useCallback(() => {
//     if ('Notification' in window) {
//       Notification.requestPermission().then((permission) => {
//         if (permission === 'granted') {
//           triggerBrowserNotification("🔔 Notifications Enabled", "You'll now receive real-time updates.");
//         }
//       });
//     }
//   }, []);

//   useEffect(() => {
//     requestNotificationPermission();
//   }, [requestNotificationPermission]);

//   useEffect(() => {
//     if (!socket) return console.warn("Socket not connected.");

//     const handleNotification = (ticket) => {
//       const template = notificationTemplates[ticket.notification_type];
//       if (!template) return;

//       const title = template.title;
//       const description = template.getDescription(ticket.ticket_Id, ticket.closed_by);

//       // Real-time Toast & Browser Notification
//       template.toast(ticket.ticket_Id);
//       triggerBrowserNotification(title, description);

//       // Add to menu notification list
//       const newNoti = {
//         id: ticket.id || Date.now(),
//         title,
//         description,
//         time: dayjs().fromNow(),
//         createdAt: Date.now(),
//       };
//       setNotifications((prev) => [newNoti, ...prev.sort((a, b) => b.createdAt - a.createdAt)]);
//     };

//     socket.on("receiveNotification", handleNotification);
//     return () => {
//       socket.off("receiveNotification", handleNotification);
//     };
//   }, [id]);

//   const handleNotifications = (ticketId) => {
//     navigate(`/manager-review-ticket/${ticketId}`);
//     handleClose();
//   };
//   return (
//     <>
//       <IconButton onClick={handleClick}>
//         <Badge color="secondary" badgeContent={notifications.length}>
//           <NotificationsIcon sx={{ color: '#616161' }} />
//         </Badge>
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{ style: { width: '340px', padding: '10px 0' } }}
//       >
//         <Typography variant="h6" sx={{ px: 2, mb: 1 }}>
//           Notifications
//         </Typography>
//         <Divider />
//         <Box sx={{ maxHeight: '300px', overflowY: 'auto', px: 1 }}>
//           {notifications.length > 0 ? (
//             notifications.map((note) => (
//               <MenuItem key={note.id} sx={{ whiteSpace: 'normal' }}  onClick={() => handleNotifications(note.ticket_Id)}>
//                 <ListItemText
//                   primary={<Typography fontWeight="bold">{note.title}</Typography>}
//                   secondary={
//                     <>
//                       <Typography variant="body2">{note.description}</Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {note.time}
//                       </Typography>
//                     </>
//                   }
//                 />
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem disabled>
//               <Typography variant="body2">No new notifications</Typography>
//             </MenuItem>
//           )}
//         </Box>
//       </Menu>
//     </>
//   );
// }

// export default ManagerNotification;



import React, { useCallback, useEffect, useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ListItemText,
  Badge,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getAllNotificationsServices } from '../Services/notifications.services';
import { getAllUsers } from '../Services/auth.services';
import cookies from 'js-cookie';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { toast } from 'react-toastify';
import { useSocket } from '../Context/socket.context';
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);

const ICON_URL = "https://ticketing-systems-five.vercel.app/logo.webp";

const notificationTemplates = {
  "new Ticket open": {
    title: "🎫 New Ticket Opened",
    getDescription: (id) => `Ticket ${id} has just been created. Please review.`,
    toast: (id) => toast.info(`New Ticket Opened: ${id}`),
  },
  "assign to agent": {
    title: "👤 Ticket Assigned to Agent",
    getDescription: (id) => `Ticket ${id} is now assigned to an agent.`,
    toast: (id) => toast.success(`Ticket ${id} assigned to agent.`),
  },
  "assign to manager": {
    title: "🗂️ Ticket Assigned to You",
    getDescription: (id) => `You have been assigned ticket ${id}.`,
    toast: (id) => toast.success(`New Ticket Assigned: ${id}`),
  },
  "complete ticket": {
    title: "✅ Ticket Completed",
    getDescription: (id) => `Ticket ${id} has been resolved by the agent.`,
    toast: (id) => toast.success(`Ticket Completed: ${id}`),
  },
  "approved by market manager": {
    title: "🟢 Approved by Market Manager",
    getDescription: (id) => `Ticket ${id} approved by Market Manager.`,
    toast: (id) => toast.success(`Market Approved: ${id}`),
  },
  "denied by market manager": {
    title: "🔴 Denied by Market Manager",
    getDescription: (id) => `Ticket ${id} denied by Market Manager.`,
    toast: (id) => toast.error(`Market Denied: ${id}`),
  },
  "approved by district manager": {
    title: "✅ District Approval",
    getDescription: (id) => `Ticket ${id} approved by District Manager.`,
    toast: (id) => toast.success(`District Approved: ${id}`),
  },
  "denied by district manager": {
    title: "⛔ District Denied",
    getDescription: (id) => `Ticket ${id} denied by District Manager.`,
    toast: (id) => toast.error(`District Denied: ${id}`),
  },
  "ticket review": {
    title: "🔍 Ticket Under Review",
    getDescription: (id) => `Ticket ${id} has been submitted for review.`,
    toast: (id) => toast.info(`Ticket Under Review: ${id}`),
  },
  "ticket closed": {
    title: "🔒 Ticket Closed",
    getDescription: (id, closed_by) => `Ticket ${id} closed by ${closed_by}.`,
    toast: (id) => toast.success(`Ticket Closed: ${id}`),
  },
  "ticket Re-open": {
    title: "🔓 Ticket Reopened",
    getDescription: (id, closed_by) => `Ticket ${id} was reopened by ${closed_by}.`,
    toast: (id) => toast.info(`Ticket Reopened: ${id}`),
  },
};

function ManagerNotification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = cookies.get('id');
  const [notifications, setNotifications] = useState([]);
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const [resNoti, resUsers] = await Promise.all([
        getAllNotificationsServices(),
        getAllUsers(),
      ]);

      const currentUser = resUsers.data.data.find((u) => u.id == id);
      if (!currentUser || !resNoti.data?.data) return;

      const filtered = resNoti.data.data
        .filter((n) => n.manager == id)
        .map((n) => {
          const template = notificationTemplates[n.notification_type];
          const title = template?.title || "🔔 Notification";
          const description = template?.getDescription(n.ticket_Id, n.closed_by) || "You have a new update.";

          return {
            id: n.id,
            ticket_Id: n.ticketId,
            title,
            description,
            time: dayjs(n.createdAt).fromNow(),
            createdAt: new Date(n.createdAt).getTime(),
          };
        });

      setNotifications(filtered.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
      console.error("❌ Failed to fetch notifications:", error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const triggerBrowserNotification = (title, description) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: description,
        icon: ICON_URL,
      });
    }
  };

  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          triggerBrowserNotification("🔔 Notifications Enabled", "You'll now receive real-time updates.");
        }
      });
    }
  }, []);

  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  useEffect(() => {
    if (!socket) return console.warn("Socket not connected.");

    const handleNotification = (ticket) => {
      const template = notificationTemplates[ticket.notification_type];
      if (!template) return;

      const title = template.title;
      const description = template.getDescription(ticket.ticket_Id, ticket.closed_by);

      template.toast(ticket.ticket_Id);
      triggerBrowserNotification(title, description);

      const newNoti = {
        id: ticket.id || Date.now(),
        ticket_Id: ticket.ticket_Id,
        title,
        description,
        time: dayjs(new Date()).fromNow(),
        createdAt: Date.now(),
      };

      setNotifications((prev) => [newNoti, ...prev].sort((a, b) => b.createdAt - a.createdAt));
    };

    socket.on("receiveNotification", handleNotification);
    return () => {
      socket.off("receiveNotification", handleNotification);
    };
  }, [socket]);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge color="secondary" badgeContent={notifications.length}>
          <NotificationsIcon sx={{ color: '#616161' }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ style: { width: '340px', padding: '10px 0' } }}
      >
        <Typography variant="h6" sx={{ px: 2, mb: 1 }}>
          Notifications
        </Typography>
        <Divider />
        <Box sx={{ maxHeight: '300px', overflowY: 'auto', px: 1 }}>
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <MenuItem key={note.id} sx={{ whiteSpace: 'normal' }} onClick={() => {navigate(`/manager-review-ticket/${note.id}`,handleClose())}}>
                <ListItemText
                  primary={<Typography fontWeight="bold">{note.title}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2">{note.description}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {note.time}
                      </Typography>
                    </>
                  }
                />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>
              <Typography variant="body2">No new notifications</Typography>
            </MenuItem>
          )}
        </Box>
      </Menu>
    </>
  );
}

export default ManagerNotification;
