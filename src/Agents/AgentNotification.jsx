// import React, { useCallback, useEffect, useState } from 'react';
// import {
//     IconButton,
//     Menu,
//     MenuItem,
//     Typography,
//     Box,
//     Divider,
//     ListItemText,
//     Badge,
// } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { getAllNotificationsServices } from '../Services/notifications.services';
// import { getAllUsers } from '../Services/auth.services';
// import cookies from 'js-cookie';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { toast } from 'react-toastify';

// dayjs.extend(relativeTime);

// function AgentNotification() {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);
//     const id = cookies.get('id');
//     const [notifications, setNotifications] = useState([]);

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const allNotifications = useCallback(async () => {
//         try {
//             const response = await getAllNotificationsServices();
//             const allUser = await getAllUsers();
//             const filteredUser = allUser.data.data.find((data) => data._id === id);
//             if (!filteredUser || !response?.data?.data) return;
//             const filteredNoti = response.data.data
//                 .filter((noti) => noti.recipientId === id)
//                 .map((noti) => {
//                     let title = '';
//                     let description = '';

//                     switch (noti.notification_type) {

//                         case 'assign to agent':
//                             title = '🔒 New tickte assingn!';
//                             description = `✅ change description ${noti.ticket_Id} has been closed by ${noti.closed_by}.`;//change description
//                             break;

//                         case 'ticket closed':
//                             title = '🔒 Ticket Closed!';
//                             description = `✅ ${noti.ticket_Id} has been closed by ${noti.closed_by}.`;
//                             break;
//                         default:
//                             title = 'Notification';
//                             description = 'You have a new notification.';
//                             break;
//                     }

//                     return {
//                         id: noti._id,
//                         title,
//                         description,
//                         time: dayjs(noti.createdAt).fromNow(),
//                         createdAt: new Date(noti.createdAt).getTime(),
//                     };
//                 });

//             setNotifications(filteredNoti.sort((a, b) => b.createdAt - a.createdAt));
//         } catch (error) {
//             console.error('❌ Error fetching notifications:', error.message);
//         }
//     }, [id]);

//     useEffect(() => {
//         if (!socket) {
//             console.warn("⚠️ Socket is not initialized");
//             return;
//         }
//         const handleNotification = (ticket) => {
//             if (!ticket) return;
//             console.log(ticket)
//             let title = "";
//             let description = "";
//             if (ticket.notification_type === "assign to agent") {
//                 title = "New Ticket Assigned";
//                 description = `New Ticket: ${ticket.ticket_Id}`.slice(0, 50) + "...";
//                 toast.success("New Ticket Assigned has been assigned to you. Please review and take action ASAP!")
//             }
//             if (ticket.notification_type === "ticket closed") {
//                 title = "🔒 Ticket Closed!";
//                 description = `✅${ticket.ticket_Id} has been successfully closed by the ${ticket.closed_by}. No further actions are required.`;
//                 toast.success("Ticket Closed 🔒");
//             }
//             else if (ticket.notification_type === "ticket Re-open") {
//                 title = "🔒 Ticket Re-open!";
//                 description = `🔄 Ticket ${ticket.ticket_Id} has been successfully re-opened by ${ticket.closed_by}. Please review and take the necessary action.`;
//                 toast.success("Ticket Re-opened 🔓");
//             }

//             sentNotification(title, description)

//             if (!title) return;

//             const newNotification = {
//                 id: ticket._id || Date.now(),
//                 title,
//                 description,
//                 time: dayjs().fromNow(),
//                 createdAt: Date.now()
//             };

//             setNotifications((prev) => [newNotification, ...prev.sort((a, b) => b.createdAt - a.createdAt)]);
//         };

//         socket.off("receiveNotification", handleNotification);

//         socket.on("receiveNotification", handleNotification);
//         return () => {
//             socket.off("receiveNotification", handleNotification);
//         };
//     }, [socket, id]);

//     useEffect(() => {
//         allNotifications();
//     }, [allNotifications]);
//     const sentNotification = async (title, description) => {
//         if ('Notification' in window && Notification.permission === "granted") {
//             console.log("after sent notification", title, description)
//             new Notification(title, {
//                 body: description,
//                 icon: "https://ticketing-systems-five.vercel.app/logo.webp" // Example icon, adjust as needed
//             });
//         } else {
//             console.log("Notification permission not granted.");
//         }
//     };

//     const requestNotificationPermission = useCallback(() => {
//         if ('Notification' in window) {
//             Notification.requestPermission().then(function (permission) {
//                 if (permission === 'granted') {
//                     sentNotification("Hello Developer!", "Testing mode");
//                 }
//             });
//         }
//     }, []);

//     useEffect(() => {
//         if ('Notification' in window) {
//             requestNotificationPermission();
//         }
//     }, [requestNotificationPermission])

//     return (
//         <>
//             <IconButton onClick={handleClick}>
//                 <Badge color="secondary" badgeContent={notifications.length}>
//                     <NotificationsIcon sx={{ color: '#616161' }} />
//                 </Badge>
//             </IconButton>

//             <Menu
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//                 PaperProps={{ style: { width: '320px', padding: '10px 0' } }}
//             >
//                 <Typography variant="h6" sx={{ px: 2, mb: 1 }}>
//                     Notifications
//                 </Typography>
//                 <Divider />
//                 <Box sx={{ maxHeight: '300px', overflowY: 'auto', px: 1 }}>
//                     {notifications.length > 0 ? (
//                         notifications.map((note) => (
//                             <MenuItem key={note.id} onClick={handleClose} sx={{ whiteSpace: 'normal' }}>
//                                 <ListItemText
//                                     primary={note.title}
//                                     secondary={
//                                         <>
//                                             <Typography variant="body2">{note.description}</Typography>
//                                             <Typography variant="caption" color="text.secondary">
//                                                 {note.time}
//                                             </Typography>
//                                         </>
//                                     }
//                                 />
//                             </MenuItem>
//                         ))
//                     ) : (
//                         <MenuItem disabled>
//                             <Typography variant="body2">No new notifications</Typography>
//                         </MenuItem>
//                     )}
//                 </Box>
//             </Menu>
//         </>
//     );
// }

// export default AgentNotification

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

// Extend dayjs with relativeTime
dayjs.extend(relativeTime);

function AgentNotification() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = cookies.get('id');
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate()
    const { socket } = useSocket()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sentNotification = async (title, description) => {
        if ('Notification' in window && Notification.permission === "granted") {
            new Notification(title, {
                body: description,
                icon: "https://ticketing-systems-five.vercel.app/logo.webp"
            });
        } else {
            console.log("🛑 Browser notification permission not granted.");
        }
    };

    const requestNotificationPermission = useCallback(() => {
        if ('Notification' in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    console.log("✅ Browser notification permission granted.");
                } else {
                    console.warn("🚫 Browser notification permission denied.");
                }
            });
        }
    }, []);

    const allNotifications = useCallback(async () => {
        try {
            const response = await getAllNotificationsServices();
            const allUser = await getAllUsers();
            const filteredUser = allUser.data.data.find((data) => data.id == id);
            if (!filteredUser || !response?.data?.data) return;
            const filteredNoti = response.data.data
                .filter((noti) => noti.recipientId == id)
                .map((noti) => {
                    let title = '';
                    let description = '';

                    switch (noti.notification_type) {
                        case 'assign to agent':
                            title = '🎯 New Ticket Assigned!';
                            description = `Ticket ${noti.ticket_Id} has been assigned to you.`;
                            break;
                        case 'ticket closed':
                            title = '🔒 Ticket Closed!';
                            description = `✅ Ticket ${noti.ticket_Id} has been closed by ${noti.closed_by}.`;
                            break;
                        case 'ticket Re-open':
                            title = '🔓 Ticket Re-opened!';
                            description = `🔄 Ticket ${noti.ticket_Id} has been reopened by ${noti.closed_by}.`;
                            break;
                        default:
                            title = '📢 New Notification';
                            description = 'You have received a new update.';
                            break;
                    }

                    return {
                        id: noti.id,
                        ticket_Id: noti.ticketId,
                        title,
                        description,
                        time: dayjs(noti.createdAt).fromNow(),
                        createdAt: new Date(noti.createdAt).getTime(),
                    };
                });

            setNotifications(filteredNoti.sort((a, b) => b.createdAt - a.createdAt));
        } catch (error) {
            console.error('❌ Error fetching notifications:', error.message);
        }
    }, [id]);

    useEffect(() => {
        allNotifications();
    }, [allNotifications]);

    useEffect(() => {
        if (!socket) {
            console.warn("⚠️ Socket not available.");
            return;
        }

        const handleNotification = (ticket) => {
            if (ticket.recipientId != id) return;

            let title = "";
            let description = "";

            if (ticket.notification_type === "assign to agent") {
                title = "🎯 New Ticket Assigned!";
                description = `Ticket ${ticket.ticket_Id} has been assigned to you.`;
                toast.success("A new ticket has been assigned to you.");
                sentNotification(title, description);
            } else if (ticket.notification_type === "ticket closed") {
                title = "🔒 Ticket Closed!";
                description = `✅ Ticket ${ticket.ticket_Id} closed by ${ticket.closed_by}.`;
                toast.success("Ticket Closed 🔒");
                sentNotification(title, description);
            } else if (ticket.notification_type === "ticket Re-open") {
                title = "🔓 Ticket Re-opened!";
                description = `🔄 Ticket ${ticket.ticket_Id} reopened by ${ticket.closed_by}.`;
                toast.success("Ticket Reopened 🔓");
                sentNotification(title, description);
            }
            if (!title) return;
            const newNotification = {
                id: ticket.id || Date.now(),
                title,
                ticket_Id: ticket.ticketId,
                description,
                time: dayjs().fromNow(),
                createdAt: Date.now()
            };
            setNotifications((prev) => [newNotification, ...prev].sort((a, b) => b.createdAt - a.createdAt));
        };

        socket.off("receiveNotification", handleNotification);
        socket.on("receiveNotification", handleNotification);

        return () => {
            socket.off("receiveNotification", handleNotification);
        };
    }, [socket, id]);

    useEffect(() => {
        requestNotificationPermission();
    }, [requestNotificationPermission]);

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
                PaperProps={{ style: { width: '320px', padding: '10px 0' } }}
            >
                <Typography variant="h6" sx={{ px: 2, mb: 1 }}>
                    Notifications
                </Typography>
                <Divider />
                <Box sx={{ maxHeight: '300px', overflowY: 'auto', px: 1 }}>
                    {notifications.length > 0 ? (
                        notifications.map((note) => (
                            <MenuItem key={note.id} onClick={() => { navigate(`/agent-review-tickets/${note.ticket_Id}`, handleClose()) }} sx={{ whiteSpace: 'normal' }}>
                                <ListItemText
                                    primary={note.title}
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

export default AgentNotification;
