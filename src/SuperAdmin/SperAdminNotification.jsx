// // // import React, { useCallback, useEffect, useState } from 'react';
// // // import {
// // //   IconButton,
// // //   Menu,
// // //   MenuItem,
// // //   Typography,
// // //   Box,
// // //   Divider,
// // //   ListItemText,
// // //   Badge,
// // // } from '@mui/material';
// // // import NotificationsIcon from '@mui/icons-material/Notifications';
// // // import { getAllNotificationsServices } from '../Services/notifications.services';
// // // import { getAllUsers } from '../Services/auth.services';
// // // import cookies from 'js-cookie';
// // // import dayjs from 'dayjs';
// // // import relativeTime from 'dayjs/plugin/relativeTime';
// // // import { toast } from 'react-toastify';
// // // import { useSocket } from '../Context/socket.context';
// // // import { useNavigate } from 'react-router-dom';

// // // dayjs.extend(relativeTime);

// // // const ICON_URL = "https://ticketing-systems-five.vercel.app/logo.webp";

// // // const notificationTemplates = {
// // //   "new Ticket open": {
// // //     title: "🎫 New Ticket Opened",
// // //     getDescription: (id) => `Ticket ${id} has just been created. Please review.`,
// // //     toast: (id) => toast.info(`New Ticket Opened: ${id}`),
// // //   },
// // //   "assign to agent": {
// // //     title: "👤 Ticket Assigned to Agent",
// // //     getDescription: (id) => `Ticket ${id} is now assigned to an agent.`,
// // //     toast: (id) => toast.success(`Ticket ${id} assigned to agent.`),
// // //   },
// // //   "assign to manager": {
// // //     title: "🗂️ Ticket Assigned to You",
// // //     getDescription: (id) => `You have been assigned ticket ${id}.`,
// // //     toast: (id) => toast.success(`New Ticket Assigned: ${id}`),
// // //   },
// // //   "complete ticket": {
// // //     title: "✅ Ticket Completed",
// // //     getDescription: (id) => `Ticket ${id} has been resolved by the agent.`,
// // //     toast: (id) => toast.success(`Ticket Completed: ${id}`),
// // //   },
// // //   "approved by market manager": {
// // //     title: "🟢 Approved by Market Manager",
// // //     getDescription: (id) => `Ticket ${id} approved by Market Manager.`,
// // //     toast: (id) => toast.success(`Market Approved: ${id}`),
// // //   },
// // //   "denied by market manager": {
// // //     title: "🔴 Denied by Market Manager",
// // //     getDescription: (id) => `Ticket ${id} denied by Market Manager.`,
// // //     toast: (id) => toast.error(`Market Denied: ${id}`),
// // //   },
// // //   "approved by district manager": {
// // //     title: "✅ District Approval",
// // //     getDescription: (id) => `Ticket ${id} approved by District Manager.`,
// // //     toast: (id) => toast.success(`District Approved: ${id}`),
// // //   },
// // //   "denied by district manager": {
// // //     title: "⛔ District Denied",
// // //     getDescription: (id) => `Ticket ${id} denied by District Manager.`,
// // //     toast: (id) => toast.error(`District Denied: ${id}`),
// // //   },
// // //   "ticket review": {
// // //     title: "🔍 Ticket Under Review",
// // //     getDescription: (id) => `Ticket ${id} has been submitted for review.`,
// // //     toast: (id) => toast.info(`Ticket Under Review: ${id}`),
// // //   },
// // //   "ticket closed": {
// // //     title: "🔒 Ticket Closed",
// // //     getDescription: (id, closed_by) => `Ticket ${id} closed by ${closed_by}.`,
// // //     toast: (id) => toast.success(`Ticket Closed: ${id}`),
// // //   },
// // //   "ticket Re-open": {
// // //     title: "🔓 Ticket Reopened",
// // //     getDescription: (id, closed_by) => `Ticket ${id} was reopened by ${closed_by}.`,
// // //     toast: (id) => toast.info(`Ticket Reopened: ${id}`),
// // //   },
// // // };
// // // function SperAdminNotification() {
// // //     const [anchorEl, setAnchorEl] = useState(null);
// // //     const open = Boolean(anchorEl);
// // //     const id = cookies.get('id');
// // //     const [notifications, setNotifications] = useState([]);
// // //     const { socket } = useSocket();
// // //     const navigate = useNavigate();

// // //     const handleClick = (event) => setAnchorEl(event.currentTarget);
// // //     const handleClose = () => setAnchorEl(null);

// // //     const fetchNotifications = useCallback(async () => {
// // //       try {
// // //         const [resNoti, resUsers] = await Promise.all([
// // //           getAllNotificationsServices(),
// // //           getAllUsers(),
// // //         ]);

// // //         const currentUser = resUsers.data.data.find((u) => u.id === id);
// // //         if (!currentUser || !resNoti.data?.data) return;

// // //         const filtered = resNoti.data.data
// // //         //   .filter((n) => n.manager === id)
// // //           .map((n) => {
// // //             const template = notificationTemplates[n.notification_type];
// // //             const title = template?.title || "🔔 Notification";
// // //             const description = template?.getDescription(n.ticket_Id, n.closed_by) || "You have a new update.";

// // //             return {
// // //               id: n.id,
// // //               ticket_Id: n.ticketId,
// // //               title,
// // //               description,
// // //               time: dayjs(n.createdAt).fromNow(),
// // //               createdAt: new Date(n.createdAt).getTime(),
// // //             };
// // //           });

// // //         setNotifications(filtered.sort((a, b) => b.createdAt - a.createdAt));
// // //       } catch (error) {
// // //         console.error("❌ Failed to fetch notifications:", error.message);
// // //       }
// // //     }, [id]);

// // //     useEffect(() => {
// // //       fetchNotifications();
// // //     }, [fetchNotifications]);

// // //     const triggerBrowserNotification = (title, description) => {
// // //       if ('Notification' in window && Notification.permission === 'granted') {
// // //         new Notification(title, {
// // //           body: description,
// // //           icon: ICON_URL,
// // //         });
// // //       }
// // //     };

// // //     const requestNotificationPermission = useCallback(() => {
// // //       if ('Notification' in window && Notification.permission !== 'granted') {
// // //         Notification.requestPermission().then((permission) => {
// // //           if (permission === 'granted') {
// // //             triggerBrowserNotification("🔔 Notifications Enabled", "You'll now receive real-time updates.");
// // //           }
// // //         });
// // //       }
// // //     }, []);

// // //     useEffect(() => {
// // //       requestNotificationPermission();
// // //     }, [requestNotificationPermission]);

// // //     useEffect(() => {
// // //       if (!socket) return console.warn("Socket not connected.");

// // //       const handleNotification = (ticket) => {
// // //         const template = notificationTemplates[ticket.notification_type];
// // //         if (!template) return;

// // //         const title = template.title;
// // //         const description = template.getDescription(ticket.ticket_Id, ticket.closed_by);

// // //         template.toast(ticket.ticket_Id);
// // //         triggerBrowserNotification(title, description);

// // //         const newNoti = {
// // //           id: ticket.id || Date.now(),
// // //           ticket_Id: ticket.ticket_Id,
// // //           title,
// // //           description,
// // //           time: dayjs(new Date()).fromNow(),
// // //           createdAt: Date.now(),
// // //         };

// // //         setNotifications((prev) => [newNoti, ...prev].sort((a, b) => b.createdAt - a.createdAt));
// // //       };

// // //       socket.on("receiveNotification", handleNotification);
// // //       return () => {
// // //         socket.off("receiveNotification", handleNotification);
// // //       };
// // //     }, [socket]);

// // //     return (
// // //       <>
// // //         <IconButton onClick={handleClick}>
// // //           <Badge color="secondary" badgeContent={notifications.length}>
// // //             <NotificationsIcon sx={{ color: '#616161' }} />
// // //           </Badge>
// // //         </IconButton>

// // //         <Menu
// // //           anchorEl={anchorEl}
// // //           open={open}
// // //           onClose={handleClose}
// // //           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// // //           transformOrigin={{ vertical: 'top', horizontal: 'right' }}
// // //           PaperProps={{ style: { width: '340px', padding: '10px 0' } }}
// // //         >
// // //           <Typography variant="h6" sx={{ px: 2, mb: 1 }}>
// // //             Notifications
// // //           </Typography>
// // //           <Divider />
// // //           <Box sx={{ maxHeight: '300px', overflowY: 'auto', px: 1 }}>
// // //             {notifications.length > 0 ? (
// // //               notifications.map((note) => (
// // //                 <MenuItem key={note.id} sx={{ whiteSpace: 'normal' }} onClick={() => {navigate(`/manager-review-ticket/${note.ticket_Id}`,handleClose())}}>
// // //                   <ListItemText
// // //                     primary={<Typography fontWeight="bold">{note.title}</Typography>}
// // //                     secondary={
// // //                       <>
// // //                         <Typography variant="body2">{note.description}</Typography>
// // //                         <Typography variant="caption" color="text.secondary">
// // //                           {note.time}
// // //                         </Typography>
// // //                       </>
// // //                     }
// // //                   />
// // //                 </MenuItem>
// // //               ))
// // //             ) : (
// // //               <MenuItem disabled>
// // //                 <Typography variant="body2">No new notifications</Typography>
// // //               </MenuItem>
// // //             )}
// // //           </Box>
// // //         </Menu>
// // //       </>
// // //     );
// // // }

// // // export default SperAdminNotification

// // import React, { useCallback, useEffect, useState, useRef } from 'react';
// // import {
// //   IconButton,
// //   Menu,
// //   MenuItem,
// //   Typography,
// //   Box,
// //   Divider,
// //   ListItemText,
// //   Badge,
// // } from '@mui/material';
// // import NotificationsIcon from '@mui/icons-material/Notifications';
// // import { getAllNotificationsServices } from '../Services/notifications.services';
// // import { getAllUsers } from '../Services/auth.services';
// // import cookies from 'js-cookie';
// // import dayjs from 'dayjs';
// // import relativeTime from 'dayjs/plugin/relativeTime';
// // import { toast } from 'react-toastify';
// // import { useSocket } from '../Context/socket.context';
// // import { useNavigate } from 'react-router-dom';

// // dayjs.extend(relativeTime);

// // const ICON_URL = "https://ticketing-systems-five.vercel.app/logo.webp";

// // const notificationTemplates = {
// //   "new Ticket open": {
// //     title: "🎫 New Ticket Opened",
// //     getDescription: (id) => `Ticket ${id} has just been created. Please review.`,
// //     toast: (id) => toast.info(`New Ticket Opened: ${id}`),
// //   },
// //   "assign to agent": {
// //     title: "👤 Ticket Assigned to Agent",
// //     getDescription: (id) => `Ticket ${id} is now assigned to an agent.`,
// //     toast: (id) => toast.success(`Ticket ${id} assigned to agent.`),
// //   },
// //   "assign to manager": {
// //     title: "🗂️ Ticket Assigned to You",
// //     getDescription: (id) => `You have been assigned ticket ${id}.`,
// //     toast: (id) => toast.success(`New Ticket Assigned: ${id}`),
// //   },
// //   "complete ticket": {
// //     title: "✅ Ticket Completed",
// //     getDescription: (id) => `Ticket ${id} has been resolved by the agent.`,
// //     toast: (id) => toast.success(`Ticket Completed: ${id}`),
// //   },
// //   "approved by market manager": {
// //     title: "🟢 Approved by Market Manager",
// //     getDescription: (id) => `Ticket ${id} approved by Market Manager.`,
// //     toast: (id) => toast.success(`Market Approved: ${id}`),
// //   },
// //   "denied by market manager": {
// //     title: "🔴 Denied by Market Manager",
// //     getDescription: (id) => `Ticket ${id} denied by Market Manager.`,
// //     toast: (id) => toast.error(`Market Denied: ${id}`),
// //   },
// //   "approved by district manager": {
// //     title: "✅ District Approval",
// //     getDescription: (id) => `Ticket ${id} approved by District Manager.`,
// //     toast: (id) => toast.success(`District Approved: ${id}`),
// //   },
// //   "denied by district manager": {
// //     title: "⛔ District Denied",
// //     getDescription: (id) => `Ticket ${id} denied by District Manager.`,
// //     toast: (id) => toast.error(`District Denied: ${id}`),
// //   },
// //   "ticket review": {
// //     title: "🔍 Ticket Under Review",
// //     getDescription: (id) => `Ticket ${id} has been submitted for review.`,
// //     toast: (id) => toast.info(`Ticket Under Review: ${id}`),
// //   },
// //   "ticket closed": {
// //     title: "🔒 Ticket Closed",
// //     getDescription: (id, closed_by) => `Ticket ${id} closed by ${closed_by}.`,
// //     toast: (id) => toast.success(`Ticket Closed: ${id}`),
// //   },
// //   "ticket Re-open": {
// //     title: "🔓 Ticket Reopened",
// //     getDescription: (id, closed_by) => `Ticket ${id} was reopened by ${closed_by}.`,
// //     toast: (id) => toast.info(`Ticket Reopened: ${id}`),
// //   },
// // };

// // function SuperAdminNotification() {
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const open = Boolean(anchorEl);
// //   const id = cookies.get('id');
// //   const [notifications, setNotifications] = useState([]);
// //   const { socket } = useSocket();
// //   const navigate = useNavigate();

// //   // Track shown browser notifications (avoid duplicates)
// //   const shownNotifications = useRef(new Set());

// //   const handleClick = (event) => setAnchorEl(event.currentTarget);
// //   const handleClose = () => setAnchorEl(null);

// //   // ✅ Request permission only once
// //   useEffect(() => {
// //     if ('Notification' in window && Notification.permission !== 'granted') {
// //       Notification.requestPermission();
// //     }
// //   }, []);

// //   const triggerBrowserNotification = useCallback((title, description, idKey) => {
// //     if (!("Notification" in window)) return;
// //     if (shownNotifications.current.has(idKey)) return; // avoid duplicate
// //     shownNotifications.current.add(idKey);

// //     if (Notification.permission === "granted") {
// //       new Notification(title, {
// //         body: description,
// //         icon: ICON_URL,
// //       });
// //     }
// //   }, []);

// //   const fetchNotifications = useCallback(async () => {
// //     try {
// //       const [resNoti, resUsers] = await Promise.all([
// //         getAllNotificationsServices(),
// //         getAllUsers(),
// //       ]);

// //       const currentUser = resUsers.data.data.find((u) => u.id === id);
// //       if (!currentUser || !resNoti.data?.data) return;

// //       const filtered = resNoti.data.data.map((n) => {
// //         const template = notificationTemplates[n.notification_type];
// //         const title = template?.title || "🔔 Notification";
// //         const description =
// //           template?.getDescription(n.ticket_Id, n.closed_by) || "You have a new update.";

// //         return {
// //           id: n.id,
// //           ticket_Id: n.ticketId,
// //           title,
// //           description,
// //           time: dayjs(n.createdAt).fromNow(),
// //           createdAt: new Date(n.createdAt).getTime(),
// //         };
// //       });

// //       setNotifications(filtered.sort((a, b) => b.createdAt - a.createdAt));

// //       // ✅ Show each notification only once
// //       filtered.forEach((n) => {
// //         const key = `${n.ticket_Id}-${n.title}`;
// //         if (!shownNotifications.current.has(key)) {
// //           triggerBrowserNotification(n.title, n.description, key);
// //         }
// //       });
// //     } catch (error) {
// //       console.error("❌ Failed to fetch notifications:", error.message);
// //     }
// //   }, [id, triggerBrowserNotification]);

// //   useEffect(() => {
// //     fetchNotifications();
// //   }, [fetchNotifications]);

// //   // ✅ Real-time socket notifications
// //   useEffect(() => {
// //     if (!socket) return console.warn("Socket not connected.");

// //     const handleNotification = (ticket) => {
// //       const template = notificationTemplates[ticket.notification_type];
// //       if (!template) return;

// //       const title = template.title;
// //       const description = template.getDescription(ticket.ticket_Id, ticket.closed_by);

// //       const key = `${ticket.ticket_Id}-${ticket.notification_type}`;
// //       if (!shownNotifications.current.has(key)) {
// //         shownNotifications.current.add(key);
// //         template.toast(ticket.ticket_Id);
// //         triggerBrowserNotification(title, description, key);
// //       }

// //       const newNoti = {
// //         id: ticket.id || Date.now(),
// //         ticket_Id: ticket.ticket_Id,
// //         title,
// //         description,
// //         time: dayjs(new Date()).fromNow(),
// //         createdAt: Date.now(),
// //       };

// //       setNotifications((prev) => [newNoti, ...prev].sort((a, b) => b.createdAt - a.createdAt));
// //     };

// //     socket.on("receiveNotification", handleNotification);
// //     return () => {
// //       socket.off("receiveNotification", handleNotification);
// //     };
// //   }, [socket, triggerBrowserNotification]);

// //   return (
// //     <>
// //       <IconButton onClick={handleClick}>
// //         <Badge color="secondary" badgeContent={notifications.length}>
// //           <NotificationsIcon sx={{ color: '#6f2da8' }} />
// //         </Badge>
// //       </IconButton>

// //       <Menu
// //         anchorEl={anchorEl}
// //         open={open}
// //         onClose={handleClose}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
// //         PaperProps={{
// //           style: {
// //             width: '340px',
// //             padding: '10px 0',
// //             borderRadius: '12px',
// //             boxShadow: '0 6px 18px rgba(111,45,168,0.15)',
// //           },
// //         }}
// //       >
// //         <Typography
// //           variant="h6"
// //           sx={{ px: 2, mb: 1, color: '#6f2da8', fontWeight: 'bold' }}
// //         >
// //           Notifications
// //         </Typography>
// //         <Divider />
// //         <Box sx={{ maxHeight: '320px', overflowY: 'auto', px: 1 }}>
// //           {notifications.length > 0 ? (
// //             notifications.map((note) => (
// //               <MenuItem
// //                 key={note.id}
// //                 sx={{
// //                   whiteSpace: 'normal',
// //                   borderBottom: '1px solid #eee',
// //                   transition: '0.2s',
// //                   '&:hover': { backgroundColor: '#f8f2fc' },
// //                 }}
// //                 onClick={() => {
// //                   navigate(`/superAdmin-review-tickets/${note.ticket_Id}`);
// //                   handleClose();
// //                 }}
// //               >
// //                 <ListItemText
// //                   primary={<Typography fontWeight="bold">{note.title}</Typography>}
// //                   secondary={
// //                     <>
// //                       <Typography variant="body2" sx={{ color: '#555' }}>
// //                         {note.description}
// //                       </Typography>
// //                       <Typography variant="caption" color="text.secondary">
// //                         {note.time}
// //                       </Typography>
// //                     </>
// //                   }
// //                 />
// //               </MenuItem>
// //             ))
// //           ) : (
// //             <MenuItem disabled>
// //               <Typography variant="body2">No new notifications</Typography>
// //             </MenuItem>
// //           )}
// //         </Box>
// //       </Menu>
// //     </>
// //   );
// // }

// // export default SuperAdminNotification;


// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
//   Box,
//   Divider,
//   ListItemText,
//   Badge,
//   ListItemIcon,
// } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
// import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
// import ManageSearchIcon from "@mui/icons-material/ManageSearch";
// import LockIcon from "@mui/icons-material/Lock";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import CancelIcon from "@mui/icons-material/Cancel";
// import Cookies from "js-cookie";
// import { getAllNotificationsServices } from "../Services/notifications.services";
// import { getAllUsers } from "../Services/auth.services";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { toast } from "react-toastify";
// import { useSocket } from "../Context/socket.context";
// import { useNavigate } from "react-router-dom";

// dayjs.extend(relativeTime);

// const ICON_URL = "https://ticketing-systems-five.vercel.app/logo.webp";

// const notificationTemplates = {
//   "new Ticket open": {
//     title: "New Ticket Opened",
//     icon: <AddCircleOutlineIcon sx={{ color: "#6f2da8" }} />,
//     getDescription: (id) => `Ticket ${id} has been created successfully.`,
//     toast: (id) => toast.info(`New Ticket Opened: ${id}`),
//   },
//   "assign to agent": {
//     title: "Ticket Assigned to Agent",
//     icon: <AssignmentIndIcon sx={{ color: "#6f2da8" }} />,
//     getDescription: (id) => `Ticket ${id} has been assigned to an agent.`,
//     toast: (id) => toast.success(`Ticket ${id} assigned to agent.`),
//   },
//   "assign to manager": {
//     title: "Ticket Assigned to Manager",
//     icon: <SupervisorAccountIcon sx={{ color: "#6f2da8" }} />,
//     getDescription: (id) => `Ticket ${id} has been assigned to a manager.`,
//     toast: (id) => toast.success(`Ticket ${id} assigned to manager.`),
//   },
//   "complete ticket": {
//     title: "Ticket Completed",
//     icon: <TaskAltIcon sx={{ color: "#4caf50" }} />,
//     getDescription: (id) => `Ticket ${id} has been marked as completed.`,
//     toast: (id) => toast.success(`Ticket Completed: ${id}`),
//   },
//   "approved by market manager": {
//     title: "Approved by Market Manager",
//     icon: <ThumbUpAltIcon sx={{ color: "#4caf50" }} />,
//     getDescription: (id) => `Ticket ${id} approved by the Market Manager.`,
//     toast: (id) => toast.success(`Market Approved: ${id}`),
//   },
//   "denied by market manager": {
//     title: "Denied by Market Manager",
//     icon: <ThumbDownAltIcon sx={{ color: "#f44336" }} />,
//     getDescription: (id) => `Ticket ${id} denied by the Market Manager.`,
//     toast: (id) => toast.error(`Market Denied: ${id}`),
//   },
//   "approved by district manager": {
//     title: "Approved by District Manager",
//     icon: <VerifiedIcon sx={{ color: "#4caf50" }} />,
//     getDescription: (id) => `Ticket ${id} approved by District Manager.`,
//     toast: (id) => toast.success(`District Approved: ${id}`),
//   },
//   "denied by district manager": {
//     title: "Denied by District Manager",
//     icon: <CancelIcon sx={{ color: "#f44336" }} />,
//     getDescription: (id) => `Ticket ${id} denied by District Manager.`,
//     toast: (id) => toast.error(`District Denied: ${id}`),
//   },
//   "ticket review": {
//     title: "Ticket Under Review",
//     icon: <ManageSearchIcon sx={{ color: "#ff9800" }} />,
//     getDescription: (id) => `Ticket ${id} is currently under review.`,
//     toast: (id) => toast.info(`Ticket Under Review: ${id}`),
//   },
//   "ticket closed": {
//     title: "Ticket Closed",
//     icon: <LockIcon sx={{ color: "#9e9e9e" }} />,
//     getDescription: (id, closed_by) => `Ticket ${id} closed by ${closed_by}.`,
//     toast: (id) => toast.success(`Ticket Closed: ${id}`),
//   },
//   "ticket Re-open": {
//     title: "Ticket Reopened",
//     icon: <LockOpenIcon sx={{ color: "#6f2da8" }} />,
//     getDescription: (id, closed_by) => `Ticket ${id} reopened by ${closed_by}.`,
//     toast: (id) => toast.info(`Ticket Reopened: ${id}`),
//   },
// };

// function SuperAdminNotification() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const id = Cookies.get("id");
//   const [notifications, setNotifications] = useState([]);
//   const { socket } = useSocket();
//   const navigate = useNavigate();
//   const shownNotifications = useRef(new Set());

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   // ✅ Ask permission only once
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   const triggerBrowserNotification = useCallback((title, description, idKey) => {
//     if (!("Notification" in window)) return;
//     if (shownNotifications.current.has(idKey)) return;
//     shownNotifications.current.add(idKey);

//     if (Notification.permission === "granted") {
//       new Notification(title, {
//         body: description,
//         icon: ICON_URL,
//       });
//     }
//   }, []);

//   // ✅ Fetch all notifications (SuperAdmin gets all)
//   const fetchNotifications = useCallback(async () => {
//     try {
//       const [resNoti] = await Promise.all([getAllNotificationsServices()]);
//       if (!resNoti.data?.data) return;
//       const filtered = resNoti.data.data.map((n) => {
//         const template = notificationTemplates[n.notification_type];
//         const title = template?.title || "Notification";
//         const description =
//           template?.getDescription(n.ticket_Id, n.closed_by) ||
//           "You have a new update.";
//         const icon = template?.icon || <NotificationsIcon sx={{ color: "#6f2da8" }} />;

//         return {
//           id: n.id,
//           ticket_Id: n.ticket_Id,
//           ticketId: n.ticketId,
//           title,
//           icon,
//           description,
//           time: dayjs(n.createdAt).fromNow(),
//           createdAt: new Date(n.createdAt).getTime(),
//         };
//       });

//       setNotifications(filtered.sort((a, b) => b.createdAt - a.createdAt));

//       // filtered.forEach((n) => {
//       //   const key = `${n.ticket_Id}-${n.title}`;
//       //   triggerBrowserNotification(n.title, n.description, key);
//       // });
//     } catch (error) {
//       console.error("❌ Error fetching notifications:", error.message);
//     }
//   }, [triggerBrowserNotification]);

//   useEffect(() => {
//     fetchNotifications();
//   }, [fetchNotifications]);

//   // ✅ Real-time socket updates
//   useEffect(() => {
//     if (!socket) return console.warn("Socket not connected.");

//     const handleNotification = (ticket) => {
//       const template = notificationTemplates[ticket.notification_type];
//       if (!template) return;

//       const title = template.title;
//       const description = template.getDescription(ticket.ticket_Id, ticket.closed_by);
//       const icon = template.icon;
//       const key = `${ticket.ticket_Id}-${ticket.notification_type}`;

//       if (!shownNotifications.current.has(key)) {
//         shownNotifications.current.add(key);
//         template.toast(ticket.ticket_Id);
//         triggerBrowserNotification(title, description, key);
//       }

//       const newNoti = {
//         id: ticket.id || Date.now(),
//         ticket_Id: ticket.ticket_Id,
//         ticketId: ticket.ticketId,
//         title,
//         icon,
//         description,
//         time: dayjs().fromNow(),
//         createdAt: Date.now(),
//       };

//       setNotifications((prev) =>
//         [newNoti, ...prev].sort((a, b) => b.createdAt - a.createdAt)
//       );
//     };

//     socket.on("receiveNotification", handleNotification);
//     return () => socket.off("receiveNotification", handleNotification);
//   }, [socket, triggerBrowserNotification]);
//   console.log(notifications)


//   return (
//     <>
//       <IconButton onClick={handleClick}>
//         <Badge color="secondary" badgeContent={notifications.length}>
//           <NotificationsIcon sx={{ color: "#6f2da8" }} />
//         </Badge>
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//         PaperProps={{
//           style: {
//             width: "360px",
//             padding: "10px 0",
//             borderRadius: "14px",
//             boxShadow: "0 6px 18px rgba(111,45,168,0.15)",
//           },
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             px: 2,
//             mb: 1,
//             color: "#6f2da8",
//             fontWeight: "bold",
//           }}
//         >
//           Notifications
//         </Typography>
//         <Divider />
//         <Box sx={{ maxHeight: "340px", overflowY: "auto", px: 1 }}>
//           {notifications.length > 0 ? (
//             notifications.map((note) => (
//               <MenuItem
//                 key={note.id}
//                 sx={{
//                   whiteSpace: "normal",
//                   borderBottom: "1px solid #eee",
//                   transition: "0.2s",
//                   "&:hover": { backgroundColor: "#f8f2fc" },
//                 }}
//                 onClick={() => {
//                   navigate(`/superAdmin-review-tickets/${note.ticketId}`);
//                   handleClose();
//                 }}
//               >
//                 <ListItemIcon sx={{ minWidth: 36 }}>{note.icon}</ListItemIcon>
//                 <ListItemText
//                   primary={<Typography fontWeight="bold">{note.title}</Typography>}
//                   secondary={
//                     <>
//                       <Typography variant="body2" sx={{ color: "#555" }}>
//                         {note.description}
//                       </Typography>
//                       <Typography
//                         variant="caption"
//                         sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
//                       >
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

// export default SuperAdminNotification;


import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ListItemText,
  Badge,
  ListItemIcon,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import Cookies from "js-cookie";
import { getAllNotificationsServices } from "../Services/notifications.services";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import { useSocket } from "../Context/socket.context";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);

const ICON_URL = "https://ticketing-systems-five.vercel.app/logo.webp";

const notificationTemplates = {
  "new Ticket open": {
    title: "New Ticket Opened",
    icon: <AddCircleOutlineIcon sx={{ color: "#6f2da8" }} />,
    getDescription: (id) => `Ticket ${id} has been created successfully.`,
    toast: (id) => toast.info(`New Ticket Opened: ${id}`),
  },
  "assign to agent": {
    title: "Ticket Assigned to Agent",
    icon: <AssignmentIndIcon sx={{ color: "#6f2da8" }} />,
    getDescription: (id) => `Ticket ${id} has been assigned to an agent.`,
    toast: (id) => toast.success(`Ticket ${id} assigned to agent.`),
  },
  "assign to manager": {
    title: "Ticket Assigned to Manager",
    icon: <SupervisorAccountIcon sx={{ color: "#6f2da8" }} />,
    getDescription: (id) => `Ticket ${id} has been assigned to a manager.`,
    toast: (id) => toast.success(`Ticket ${id} assigned to manager.`),
  },
  "complete ticket": {
    title: "Ticket Completed",
    icon: <TaskAltIcon sx={{ color: "#4caf50" }} />,
    getDescription: (id) => `Ticket ${id} has been marked as completed.`,
    toast: (id) => toast.success(`Ticket Completed: ${id}`),
  },
  "approved by market manager": {
    title: "Approved by Market Manager",
    icon: <ThumbUpAltIcon sx={{ color: "#4caf50" }} />,
    getDescription: (id) => `Ticket ${id} approved by the Market Manager.`,
    toast: (id) => toast.success(`Market Approved: ${id}`),
  },
  "denied by market manager": {
    title: "Denied by Market Manager",
    icon: <ThumbDownAltIcon sx={{ color: "#f44336" }} />,
    getDescription: (id) => `Ticket ${id} denied by the Market Manager.`,
    toast: (id) => toast.error(`Market Denied: ${id}`),
  },
  "approved by district manager": {
    title: "Approved by District Manager",
    icon: <VerifiedIcon sx={{ color: "#4caf50" }} />,
    getDescription: (id) => `Ticket ${id} approved by District Manager.`,
    toast: (id) => toast.success(`District Approved: ${id}`),
  },
  "denied by district manager": {
    title: "Denied by District Manager",
    icon: <CancelIcon sx={{ color: "#f44336" }} />,
    getDescription: (id) => `Ticket ${id} denied by District Manager.`,
    toast: (id) => toast.error(`District Denied: ${id}`),
  },
  "ticket review": {
    title: "Ticket Under Review",
    icon: <ManageSearchIcon sx={{ color: "#ff9800" }} />,
    getDescription: (id) => `Ticket ${id} is currently under review.`,
    toast: (id) => toast.info(`Ticket Under Review: ${id}`),
  },
  "ticket closed": {
    title: "Ticket Closed",
    icon: <LockIcon sx={{ color: "#9e9e9e" }} />,
    getDescription: (id, closed_by) => `Ticket ${id} closed by ${closed_by}.`,
    toast: (id) => toast.success(`Ticket Closed: ${id}`),
  },
  "ticket Re-open": {
    title: "Ticket Reopened",
    icon: <LockOpenIcon sx={{ color: "#6f2da8" }} />,
    getDescription: (id, closed_by) => `Ticket ${id} reopened by ${closed_by}.`,
    toast: (id) => toast.info(`Ticket Reopened: ${id}`),
  },
};

function SuperAdminNotification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = Cookies.get("id");
  const [notifications, setNotifications] = useState([]);
  const { socket } = useSocket();
  const navigate = useNavigate();
  const shownNotifications = useRef(new Set());

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // ✅ Ask permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // ✅ Browser notification helper
  const triggerBrowserNotification = useCallback((title, description, idKey) => {
    if (!("Notification" in window)) return;
    if (shownNotifications.current.has(idKey)) return;
    shownNotifications.current.add(idKey);

    if (Notification.permission === "granted") {
      new Notification(title, {
        body: description,
        icon: ICON_URL,
      });
    }
  }, []);

  // ✅ Fetch only for displaying in UI (no browser popups)
  const fetchNotifications = useCallback(async () => {
    try {
      const resNoti = await getAllNotificationsServices();
      if (!resNoti.data?.data) return;

      const filtered = resNoti.data.data.map((n) => {
        const template = notificationTemplates[n.notification_type];
        const title = template?.title || "Notification";
        const description =
          template?.getDescription(n.ticket_Id, n.closed_by) ||
          "You have a new update.";
        const icon = template?.icon || <NotificationsIcon sx={{ color: "#6f2da8" }} />;

        return {
          id: n.id,
          ticket_Id: n.ticket_Id,
          ticketId: n.ticketId,
          title,
          icon,
          description,
          time: dayjs(n.createdAt).fromNow(),
          createdAt: new Date(n.createdAt).getTime(),
        };
      });

      setNotifications(filtered.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
      console.error("❌ Error fetching notifications:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // ✅ Real-time socket notifications only trigger popups/toasts
  useEffect(() => {
    if (!socket) return console.warn("Socket not connected.");

    const handleNotification = (ticket) => {
      const template = notificationTemplates[ticket.notification_type];
      if (!template) return;

      const title = template.title;
      const description = template.getDescription(ticket.ticket_Id, ticket.closed_by);
      const icon = template.icon;
      const key = `${ticket.ticket_Id}-${ticket.notification_type}`;

      // Only show for new real-time notifications
      if (!shownNotifications.current.has(key)) {
        shownNotifications.current.add(key);
        template.toast(ticket.ticket_Id);
        triggerBrowserNotification(title, description, key);
      }

      const newNoti = {
        id: ticket.id || Date.now(),
        ticket_Id: ticket.ticket_Id,
        ticketId: ticket.ticketId,
        title,
        icon,
        description,
        time: dayjs().fromNow(),
        createdAt: Date.now(),
      };

      setNotifications((prev) =>
        [newNoti, ...prev].sort((a, b) => b.createdAt - a.createdAt)
      );
    };

    socket.on("receiveNotification", handleNotification);
    return () => socket.off("receiveNotification", handleNotification);
  }, [socket, triggerBrowserNotification]);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge color="secondary" badgeContent={notifications.length}>
          <NotificationsIcon sx={{ color: "#6f2da8" }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          style: {
            width: "360px",
            padding: "10px 0",
            borderRadius: "14px",
            boxShadow: "0 6px 18px rgba(111,45,168,0.15)",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            px: 2,
            mb: 1,
            color: "#6f2da8",
            fontWeight: "bold",
          }}
        >
          Notifications
        </Typography>
        <Divider />
        <Box sx={{ maxHeight: "340px", overflowY: "auto", px: 1 }}>
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <MenuItem
                key={note.id}
                sx={{
                  whiteSpace: "normal",
                  borderBottom: "1px solid #eee",
                  transition: "0.2s",
                  "&:hover": { backgroundColor: "#f8f2fc" },
                }}
                onClick={() => {
                  navigate(`/superAdmin-review-tickets/${note.ticketId}`);
                  handleClose();
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{note.icon}</ListItemIcon>
                <ListItemText
                  primary={<Typography fontWeight="bold">{note.title}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        {note.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
                      >
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

export default SuperAdminNotification;
