// // // // import React, { useState } from "react";
// // // // import {
// // // //     Box,
// // // //     List,
// // // //     ListItem,
// // // //     ListItemText,
// // // //     Divider,
// // // //     Typography,
// // // //     IconButton,
// // // //     useMediaQuery,
// // // //     Avatar,
// // // //     Card,
// // // //     CardContent,
// // // // } from "@mui/material";
// // // // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // // // import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

// // // // const notifications = [
// // // //     {
// // // //         id: 1,
// // // //         title: "Server Down",
// // // //         message: "Main server is not responding since 2 AM.",
// // // //         time: "2h ago",
// // // //     },
// // // //     {
// // // //         id: 2,
// // // //         title: "New Ticket",
// // // //         message: "A new IT support ticket has been created.",
// // // //         time: "5h ago",
// // // //     },
// // // //     {
// // // //         id: 3,
// // // //         title: "User Added",
// // // //         message: "New user has been added to the Sales department.",
// // // //         time: "1d ago",
// // // //     },
// // // // ];

// // // // function SuperAdminAllNotifications() {
// // // //     const [selected, setSelected] = useState(null);
// // // //     const isMobile = useMediaQuery("(max-width:768px)");

// // // //     return (
// // // //         <Box display="flex" height="100vh" bgcolor="#f9fafb">
// // // //             {/* Left Sidebar - Notification List */}
// // // //             {(!isMobile || selected === null) && (
// // // //                 <Box
// // // //                     width={isMobile ? "100%" : "30%"}
// // // //                     borderRight={!isMobile ? "1px solid #eee" : "none"}
// // // //                     bgcolor="white"
// // // //                     overflow="auto"
// // // //                     boxShadow={!isMobile ? "2px 0 8px rgba(0,0,0,0.05)" : "none"}
// // // //                 >
// // // //                     <Typography
// // // //                         variant="h6"
// // // //                         p={2}
// // // //                         sx={{ fontWeight: 600, color: "#6f2da8" }}
// // // //                     >
// // // //                         Notifications
// // // //                     </Typography>
// // // //                     <Divider />
// // // //                     <List>
// // // //                         {notifications.map((n) => (
// // // //                             <ListItem
// // // //                                 button
// // // //                                 key={n.id}
// // // //                                 selected={selected?.id === n.id}
// // // //                                 onClick={() => setSelected(n)}
// // // //                                 sx={{
// // // //                                     "&.Mui-selected": {
// // // //                                         bgcolor: "#f3e8ff",
// // // //                                         borderLeft: "4px solid #6f2da8",
// // // //                                     },
// // // //                                     "&:hover": {
// // // //                                         bgcolor: "#f9f5ff",
// // // //                                     },
// // // //                                     alignItems: "flex-start",
// // // //                                     py: 2,
// // // //                                 }}
// // // //                             >
// // // //                                 <Avatar
// // // //                                     sx={{
// // // //                                         bgcolor: "#6f2da8",
// // // //                                         mr: 2,
// // // //                                         width: 36,
// // // //                                         height: 36,
// // // //                                     }}
// // // //                                 >
// // // //                                     <NotificationsNoneRoundedIcon fontSize="small" />
// // // //                                 </Avatar>
// // // //                                 <ListItemText
// // // //                                     primary={
// // // //                                         <Typography fontWeight={600} variant="body1">
// // // //                                             {n.title}
// // // //                                         </Typography>
// // // //                                     }
// // // //                                     secondary={
// // // //                                         <>
// // // //                                             <Typography
// // // //                                                 component="span"
// // // //                                                 variant="body2"
// // // //                                                 color="text.secondary"
// // // //                                             >
// // // //                                                 {n.message.substring(0, 40)}...
// // // //                                             </Typography>
// // // //                                             <br />
// // // //                                             <Typography
// // // //                                                 component="span"
// // // //                                                 variant="caption"
// // // //                                                 color="text.disabled"
// // // //                                             >
// // // //                                                 {n.time}
// // // //                                             </Typography>
// // // //                                         </>
// // // //                                     }
// // // //                                 />
// // // //                             </ListItem>
// // // //                         ))}
// // // //                     </List>
// // // //                 </Box>
// // // //             )}

// // // //             {/* Right Content - Notification Detail */}
// // // //             {selected && (
// // // //                 <Box flex={1} p={3} overflow="auto">
// // // //                     {isMobile && (
// // // //                         <IconButton onClick={() => setSelected(null)} sx={{ mb: 2 }}>
// // // //                             <ArrowBackIcon />
// // // //                         </IconButton>
// // // //                     )}

// // // //                     <Card
// // // //                         sx={{
// // // //                             borderRadius: 3,
// // // //                             boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
// // // //                             p: 2,
// // // //                             background: "white",
// // // //                         }}
// // // //                     >
// // // //                         <CardContent>
// // // //                             <Typography variant="h5" fontWeight={600} color="#6f2da8">
// // // //                                 {selected.title}
// // // //                             </Typography>
// // // //                             <Typography
// // // //                                 variant="caption"
// // // //                                 color="text.disabled"
// // // //                                 display="block"
// // // //                                 mt={0.5}
// // // //                             >
// // // //                                 {selected.time}
// // // //                             </Typography>
// // // //                             <Typography variant="body1" mt={2} lineHeight={1.6}>
// // // //                                 {selected.message}
// // // //                             </Typography>
// // // //                         </CardContent>
// // // //                     </Card>
// // // //                 </Box>
// // // //             )}
// // // //         </Box>
// // // //     );
// // // // }

// // // // export default SuperAdminAllNotifications;


// // // import React, { useState } from "react";
// // // import {
// // //     Box,
// // //     List,
// // //     ListItem,
// // //     ListItemText,
// // //     Divider,
// // //     Typography,
// // //     IconButton,
// // //     useMediaQuery,
// // //     Avatar,
// // //     Card,
// // //     CardContent,
// // //     TextField,
// // //     InputAdornment,
// // // } from "@mui/material";
// // // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // // import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
// // // import SearchIcon from "@mui/icons-material/Search";

// // // const notifications = [
// // //     {
// // //         id: 1,
// // //         title: "Server Down",
// // //         message: "Main server is not responding since 2 AM.",
// // //         time: "2h ago",
// // //     },
// // //     {
// // //         id: 2,
// // //         title: "New Ticket",
// // //         message: "A new IT support ticket has been created.",
// // //         time: "5h ago",
// // //     },
// // //     {
// // //         id: 3,
// // //         title: "User Added",
// // //         message: "New user has been added to the Sales department.",
// // //         time: "1d ago",
// // //     },
// // // ];

// // // function SuperAdminAllNotifications() {
// // //     const [selected, setSelected] = useState(null);
// // //     const [search, setSearch] = useState("");
// // //     const isMobile = useMediaQuery("(max-width:768px)");

// // //     // Filter notifications based on search input
// // //     const filtered = notifications.filter(
// // //         (n) =>
// // //             n.title.toLowerCase().includes(search.toLowerCase()) ||
// // //             n.message.toLowerCase().includes(search.toLowerCase())
// // //     );

// // //     return (
// // //         <Box display="flex" height="100vh" bgcolor="#f9fafb">
// // //             {/* Left Sidebar - Notification List */}
// // //             {(!isMobile || selected === null) && (
// // //                 <Box
// // //                     width={isMobile ? "100%" : "30%"}
// // //                     borderRight={!isMobile ? "1px solid #eee" : "none"}
// // //                     bgcolor="white"
// // //                     display="flex"
// // //                     flexDirection="column"
// // //                     boxShadow={!isMobile ? "2px 0 8px rgba(0,0,0,0.05)" : "none"}
// // //                 >
// // //                     {/* Header + Search */}
// // //                     <Box p={2} borderBottom="1px solid #eee" position="sticky" top={0} bgcolor="white" zIndex={1}>
// // //                         <Typography
// // //                             variant="h6"
// // //                             sx={{ fontWeight: 600, color: "#6f2da8", mb: 1 }}
// // //                         >
// // //                             Notifications
// // //                         </Typography>
// // //                         <TextField
// // //                             size="small"
// // //                             placeholder="Search notifications..."
// // //                             value={search}
// // //                             onChange={(e) => setSearch(e.target.value)}
// // //                             fullWidth
// // //                             InputProps={{
// // //                                 startAdornment: (
// // //                                     <InputAdornment position="start">
// // //                                         <SearchIcon fontSize="small" />
// // //                                     </InputAdornment>
// // //                                 ),
// // //                             }}
// // //                         />
// // //                     </Box>

// // //                     {/* Scrollable List */}
// // //                     <Box flex={1} overflow="auto">
// // //                         <List>
// // //                             {filtered.map((n) => (
// // //                                 <ListItem
// // //                                     button
// // //                                     key={n.id}
// // //                                     selected={selected?.id === n.id}
// // //                                     onClick={() => setSelected(n)}
// // //                                     sx={{
// // //                                         "&.Mui-selected": {
// // //                                             bgcolor: "#f3e8ff",
// // //                                             borderLeft: "4px solid #6f2da8",
// // //                                         },
// // //                                         "&:hover": {
// // //                                             bgcolor: "#f9f5ff",
// // //                                         },
// // //                                         alignItems: "flex-start",
// // //                                         py: 2,
// // //                                     }}
// // //                                 >
// // //                                     <Avatar
// // //                                         sx={{
// // //                                             bgcolor: "#6f2da8",
// // //                                             mr: 2,
// // //                                             width: 36,
// // //                                             height: 36,
// // //                                         }}
// // //                                     >
// // //                                         <NotificationsNoneRoundedIcon fontSize="small" />
// // //                                     </Avatar>
// // //                                     <ListItemText
// // //                                         primary={
// // //                                             <Typography fontWeight={600} variant="body1">
// // //                                                 {n.title}
// // //                                             </Typography>
// // //                                         }
// // //                                         secondary={
// // //                                             <>
// // //                                                 <Typography
// // //                                                     component="span"
// // //                                                     variant="body2"
// // //                                                     color="text.secondary"
// // //                                                 >
// // //                                                     {n.message.substring(0, 40)}...
// // //                                                 </Typography>
// // //                                                 <br />
// // //                                                 <Typography
// // //                                                     component="span"
// // //                                                     variant="caption"
// // //                                                     color="text.disabled"
// // //                                                 >
// // //                                                     {n.time}
// // //                                                 </Typography>
// // //                                             </>
// // //                                         }
// // //                                     />
// // //                                 </ListItem>
// // //                             ))}
// // //                             {filtered.length === 0 && (
// // //                                 <Typography
// // //                                     variant="body2"
// // //                                     color="text.secondary"
// // //                                     align="center"
// // //                                     sx={{ mt: 4 }}
// // //                                 >
// // //                                     No notifications found
// // //                                 </Typography>
// // //                             )}
// // //                         </List>
// // //                     </Box>
// // //                 </Box>
// // //             )}

// // //             {/* Right Content - Notification Detail */}
// // //             {selected && (
// // //                 <Box flex={1} p={3} overflow="auto">
// // //                     {isMobile && (
// // //                         <IconButton onClick={() => setSelected(null)} sx={{ mb: 2 }}>
// // //                             <ArrowBackIcon />
// // //                         </IconButton>
// // //                     )}

// // //                     <Card
// // //                         sx={{
// // //                             borderRadius: 3,
// // //                             boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
// // //                             p: 2,
// // //                             background: "white",
// // //                         }}
// // //                     >
// // //                         <CardContent>
// // //                             <Typography variant="h5" fontWeight={600} color="#6f2da8">
// // //                                 {selected.title}
// // //                             </Typography>
// // //                             <Typography
// // //                                 variant="caption"
// // //                                 color="text.disabled"
// // //                                 display="block"
// // //                                 mt={0.5}
// // //                             >
// // //                                 {selected.time}
// // //                             </Typography>
// // //                             <Typography variant="body1" mt={2} lineHeight={1.6}>
// // //                                 {selected.message}
// // //                             </Typography>
// // //                         </CardContent>
// // //                     </Card>
// // //                 </Box>
// // //             )}
// // //         </Box>
// // //     );
// // // }

// // // export default SuperAdminAllNotifications;



// // import React, { useCallback, useEffect, useState } from "react";
// // import {
// //     Box,
// //     List,
// //     ListItem,
// //     ListItemText,
// //     Divider,
// //     Typography,
// //     IconButton,
// //     useMediaQuery,
// //     Avatar,
// //     Card,
// //     CardContent,
// //     TextField,
// //     InputAdornment,
// // } from "@mui/material";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
// // import SearchIcon from "@mui/icons-material/Search";
// // import { getAllNotificationsServices } from "../Services/notifications.services";

// // const notifications = [
// //     {
// //         id: 1,
// //         title: "Server Down",
// //         message: "Main server is not responding since 2 AM.",
// //         time: "2h ago",
// //     },
// //     {
// //         id: 2,
// //         title: "New Ticket",
// //         message: "A new IT support ticket has been created.",
// //         time: "5h ago",
// //     },
// //     {
// //         id: 3,
// //         title: "User Added",
// //         message: "New user has been added to the Sales department.",
// //         time: "1d ago",
// //     },
// // ];

// // function SuperAdminAllNotifications() {
// //     const [selected, setSelected] = useState(null);
// //     const [search, setSearch] = useState("");
// //     const isMobile = useMediaQuery("(max-width:768px)");

// //     const fetchAllNotifications = useCallback(async () => {
// //         try {
// //             const response = await getAllNotificationsServices();
// //             console.log(response.data.data)
// //         } catch (error) {
// //             console.log("ERROR", error.message)
// //         }
// //     }, [])

// //     useEffect(() => {
// //         fetchAllNotifications();
// //     }, [fetchAllNotifications])
// //     // Filter notifications based on search input
// //     const filtered = notifications.filter(
// //         (n) =>
// //             n.title.toLowerCase().includes(search.toLowerCase()) ||
// //             n.message.toLowerCase().includes(search.toLowerCase())
// //     );

// //     return (
// //         <Box display="flex" height="100vh" bgcolor="#f9fafb">
// //             {/* Left Sidebar - Notification List */}
// //             {(!isMobile || selected === null) && (
// //                 <Box
// //                     width={isMobile ? "100%" : "30%"}
// //                     borderRight={!isMobile ? "1px solid #eee" : "none"}
// //                     bgcolor="white"
// //                     display="flex"
// //                     flexDirection="column"
// //                     boxShadow={!isMobile ? "2px 0 8px rgba(0,0,0,0.05)" : "none"}
// //                 >
// //                     {/* Header + Search */}
// //                     <Box p={2} borderBottom="1px solid #eee" position="sticky" top={0} bgcolor="white" zIndex={1}>
// //                         <Typography
// //                             variant="h6"
// //                             sx={{ fontWeight: 600, color: "#6f2da8", mb: 1 }}
// //                         >
// //                             Notifications
// //                         </Typography>
// //                         <TextField
// //                             size="small"
// //                             placeholder="Search notifications..."
// //                             value={search}
// //                             onChange={(e) => setSearch(e.target.value)}
// //                             fullWidth
// //                             InputProps={{
// //                                 startAdornment: (
// //                                     <InputAdornment position="start">
// //                                         <SearchIcon fontSize="small" />
// //                                     </InputAdornment>
// //                                 ),
// //                             }}
// //                         />
// //                     </Box>

// //                     {/* Scrollable List */}
// //                     <Box flex={1} overflow="auto">
// //                         <List>
// //                             {filtered.map((n) => (
// //                                 <ListItem
// //                                     button
// //                                     key={n.id}
// //                                     selected={selected?.id === n.id}
// //                                     onClick={() => setSelected(n)}
// //                                     sx={{
// //                                         "&.Mui-selected": {
// //                                             bgcolor: "#f3e8ff",
// //                                             borderLeft: "4px solid #6f2da8",
// //                                         },
// //                                         "&:hover": {
// //                                             bgcolor: "#f9f5ff",
// //                                         },
// //                                         alignItems: "flex-start",
// //                                         py: 2,
// //                                     }}
// //                                 >
// //                                     <Avatar
// //                                         sx={{
// //                                             bgcolor: "#6f2da8",
// //                                             mr: 2,
// //                                             width: 36,
// //                                             height: 36,
// //                                         }}
// //                                     >
// //                                         <NotificationsNoneRoundedIcon fontSize="small" />
// //                                     </Avatar>
// //                                     <ListItemText
// //                                         primary={
// //                                             <Typography fontWeight={600} variant="body1">
// //                                                 {n.title}
// //                                             </Typography>
// //                                         }
// //                                         secondary={
// //                                             <>
// //                                                 <Typography
// //                                                     component="span"
// //                                                     variant="body2"
// //                                                     color="text.secondary"
// //                                                 >
// //                                                     {n.message.substring(0, 40)}...
// //                                                 </Typography>
// //                                                 <br />
// //                                                 <Typography
// //                                                     component="span"
// //                                                     variant="caption"
// //                                                     color="text.disabled"
// //                                                 >
// //                                                     {n.time}
// //                                                 </Typography>
// //                                             </>
// //                                         }
// //                                     />
// //                                 </ListItem>
// //                             ))}
// //                             {filtered.length === 0 && (
// //                                 <Typography
// //                                     variant="body2"
// //                                     color="text.secondary"
// //                                     align="center"
// //                                     sx={{ mt: 4 }}
// //                                 >
// //                                     No notifications found
// //                                 </Typography>
// //                             )}
// //                         </List>
// //                     </Box>
// //                 </Box>
// //             )}

// //             {/* Right Content - Notification Detail */}
// //             {selected && (
// //                 <Box flex={1} p={3} overflow="auto">
// //                     {isMobile && (
// //                         <IconButton onClick={() => setSelected(null)} sx={{ mb: 2 }}>
// //                             <ArrowBackIcon />
// //                         </IconButton>
// //                     )}

// //                     <Card
// //                         sx={{
// //                             borderRadius: 3,
// //                             boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
// //                             p: 2,
// //                             background: "white",
// //                         }}
// //                     >
// //                         <CardContent>
// //                             <Typography variant="h5" fontWeight={600} color="#6f2da8">
// //                                 {selected.title}
// //                             </Typography>
// //                             <Typography
// //                                 variant="caption"
// //                                 color="text.disabled"
// //                                 display="block"
// //                                 mt={0.5}
// //                             >
// //                                 {selected.time}
// //                             </Typography>
// //                             <Typography variant="body1" mt={2} lineHeight={1.6}>
// //                                 {selected.message}
// //                             </Typography>
// //                         </CardContent>
// //                     </Card>
// //                 </Box>
// //             )}
// //         </Box>
// //     );
// // }

// // export default SuperAdminAllNotifications;


// import React, { useCallback, useEffect, useState } from "react";
// import {
//     Box,
//     List,
//     ListItem,
//     ListItemText,
//     Divider,
//     Typography,
//     IconButton,
//     useMediaQuery,
//     Avatar,
//     Card,
//     CardContent,
//     TextField,
//     InputAdornment,
//     CircularProgress,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
// import SearchIcon from "@mui/icons-material/Search";
// import { getAllNotificationsServices } from "../Services/notifications.services";
// import { formatDistanceToNow } from "date-fns"; // for time formatting

// function SuperAdminAllNotifications() {
//     const [notifications, setNotifications] = useState([]);
//     const [selected, setSelected] = useState(null);
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(false);
//     const isMobile = useMediaQuery("(max-width:768px)");

//     const fetchAllNotifications = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await getAllNotificationsServices();
//             setNotifications(response.data.data || []);
//         } catch (error) {
//             console.log("ERROR", error.message);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchAllNotifications();
//     }, [fetchAllNotifications]);

//     // Filter notifications based on search input
//     const filtered = notifications.filter(
//         (n) =>
//             n.notification_type?.toLowerCase().includes(search.toLowerCase()) ||
//             n.ticket_Id?.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <Box display="flex" height="100vh" bgcolor="#f9fafb">
//             {/* Left Sidebar - Notification List */}
//             {(!isMobile || selected === null) && (
//                 <Box
//                     width={isMobile ? "100%" : "30%"}
//                     borderRight={!isMobile ? "1px solid #eee" : "none"}
//                     bgcolor="white"
//                     display="flex"
//                     flexDirection="column"
//                     boxShadow={!isMobile ? "2px 0 8px rgba(0,0,0,0.05)" : "none"}
//                 >
//                     {/* Header + Search */}
//                     <Box
//                         p={2}
//                         borderBottom="1px solid #eee"
//                         position="sticky"
//                         top={0}
//                         bgcolor="white"
//                         zIndex={1}
//                     >
//                         <Typography
//                             variant="h6"
//                             sx={{ fontWeight: 600, color: "#6f2da8", mb: 1 }}
//                         >
//                             Notifications
//                         </Typography>
//                         <TextField
//                             size="small"
//                             placeholder="Search notifications..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             fullWidth
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <SearchIcon fontSize="small" />
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />
//                     </Box>

//                     {/* Scrollable List */}
//                     <Box flex={1} overflow="auto">
//                         {loading ? (
//                             <Box display="flex" justifyContent="center" mt={4}>
//                                 <CircularProgress size={30} />
//                             </Box>
//                         ) : (
//                             <List>
//                                 {filtered.map((n) => (
//                                     <ListItem
//                                         button
//                                         key={n.id}
//                                         selected={selected?.id === n.id}
//                                         onClick={() => setSelected(n)}
//                                         sx={{
//                                             "&.Mui-selected": {
//                                                 bgcolor: "#f3e8ff",
//                                                 borderLeft: "4px solid #6f2da8",
//                                             },
//                                             "&:hover": {
//                                                 bgcolor: "#f9f5ff",
//                                             },
//                                             alignItems: "flex-start",
//                                             py: 2,
//                                         }}
//                                     >
//                                         <Avatar
//                                             sx={{
//                                                 bgcolor: "#6f2da8",
//                                                 mr: 2,
//                                                 width: 36,
//                                                 height: 36,
//                                             }}
//                                         >
//                                             <NotificationsNoneRoundedIcon fontSize="small" />
//                                         </Avatar>
//                                         <ListItemText
//                                             primary={
//                                                 <Typography fontWeight={600} variant="body1">
//                                                     {n.notification_type || "Notification"}
//                                                 </Typography>
//                                             }
//                                             secondary={
//                                                 <>
//                                                     <Typography
//                                                         component="span"
//                                                         variant="body2"
//                                                         color="text.secondary"
//                                                     >
//                                                         {n.ticket_Id
//                                                             ? `Related to ${n.ticket_Id}`
//                                                             : "No Ticket Info"}
//                                                     </Typography>
//                                                     <br />
//                                                     <Typography
//                                                         component="span"
//                                                         variant="caption"
//                                                         color="text.disabled"
//                                                     >
//                                                         {n.createdAt
//                                                             ? formatDistanceToNow(new Date(n.createdAt), {
//                                                                 addSuffix: true,
//                                                             })
//                                                             : ""}
//                                                     </Typography>
//                                                 </>
//                                             }
//                                         />
//                                     </ListItem>
//                                 ))}
//                                 {filtered.length === 0 && !loading && (
//                                     <Typography
//                                         variant="body2"
//                                         color="text.secondary"
//                                         align="center"
//                                         sx={{ mt: 4 }}
//                                     >
//                                         No notifications found
//                                     </Typography>
//                                 )}
//                             </List>
//                         )}
//                     </Box>
//                 </Box>
//             )}

//             {/* Right Content - Notification Detail */}
//             {selected && (
//                 <Box flex={1} p={3} overflow="auto">
//                     {isMobile && (
//                         <IconButton onClick={() => setSelected(null)} sx={{ mb: 2 }}>
//                             <ArrowBackIcon />
//                         </IconButton>
//                     )}

//                     <Card
//                         sx={{
//                             borderRadius: 3,
//                             boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
//                             p: 2,
//                             background: "white",
//                         }}
//                     >
//                         <CardContent>
//                             <Typography variant="h5" fontWeight={600} color="#6f2da8">
//                                 {selected.notification_type}
//                             </Typography>
//                             <Typography
//                                 variant="caption"
//                                 color="text.disabled"
//                                 display="block"
//                                 mt={0.5}
//                             >
//                                 {selected.createdAt
//                                     ? new Date(selected.createdAt).toLocaleString()
//                                     : ""}
//                             </Typography>

//                             <Typography variant="body1" mt={2} lineHeight={1.6}>
//                                 Ticket: {selected.ticket_Id}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary" mt={1}>
//                                 Sender ID: {selected.senderId}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Recipient ID: {selected.recipientId}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Box>
//             )}
//         </Box>
//     );
// }

// export default SuperAdminAllNotifications;

import React, { useCallback, useEffect, useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
    IconButton,
    useMediaQuery,
    Avatar,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchIcon from "@mui/icons-material/Search";
import { getAllNotificationsServices } from "../Services/notifications.services";
import moment from "moment";

function SuperAdminAllNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");

    const fetchAllNotifications = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllNotificationsServices();
            setNotifications(response.data.data || []);
        } catch (error) {
            console.log("ERROR", error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllNotifications();
    }, [fetchAllNotifications]);

    // Filter notifications based on search input
    const filtered = notifications.filter(
        (n) =>
            n.notification_type?.toLowerCase().includes(search.toLowerCase()) ||
            n.ticket_Id?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box display="flex" height="100vh" bgcolor="#f9fafb">
            {/* Left Sidebar - Notification List */}
            {(!isMobile || selected === null) && (
                <Box
                    width={isMobile ? "100%" : "30%"}
                    borderRight={!isMobile ? "1px solid #eee" : "none"}
                    bgcolor="white"
                    display="flex"
                    flexDirection="column"
                    boxShadow={!isMobile ? "2px 0 8px rgba(0,0,0,0.05)" : "none"}
                >
                    {/* Header + Search */}
                    <Box
                        p={2}
                        borderBottom="1px solid #eee"
                        position="sticky"
                        top={0}
                        bgcolor="white"
                        zIndex={1}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: "#6f2da8", mb: 1 }}
                        >
                            Notifications
                        </Typography>
                        <TextField
                            size="small"
                            placeholder="Search notifications..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Scrollable List */}
                    <Box flex={1} overflow="auto">
                        {loading ? (
                            <Box display="flex" justifyContent="center" mt={4}>
                                <CircularProgress size={30} />
                            </Box>
                        ) : (
                            <List>
                                {filtered.map((n) => (
                                    <ListItem
                                        button
                                        key={n.id}
                                        selected={selected?.id === n.id}
                                        onClick={() => setSelected(n)}
                                        sx={{
                                            "&.Mui-selected": {
                                                bgcolor: "#f3e8ff",
                                                borderLeft: "4px solid #6f2da8",
                                            },
                                            "&:hover": {
                                                bgcolor: "#f9f5ff",
                                            },
                                            alignItems: "flex-start",
                                            py: 2,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: "#6f2da8",
                                                mr: 2,
                                                width: 36,
                                                height: 36,
                                            }}
                                        >
                                            <NotificationsNoneRoundedIcon fontSize="small" />
                                        </Avatar>
                                        <ListItemText
                                            primary={
                                                <Typography fontWeight={600} variant="body1">
                                                    {n.notification_type || "Notification"}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {n.ticket_Id
                                                            ? `Related to ${n.ticket_Id}`
                                                            : "No Ticket Info"}
                                                    </Typography>
                                                    <br />
                                                    <Typography
                                                        component="span"
                                                        variant="caption"
                                                        color="text.disabled"
                                                    >
                                                        {n.createdAt ? moment(n.createdAt).fromNow() : ""}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                ))}
                                {filtered.length === 0 && !loading && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        align="center"
                                        sx={{ mt: 4 }}
                                    >
                                        No notifications found
                                    </Typography>
                                )}
                            </List>
                        )}
                    </Box>
                </Box>
            )}

            {/* Right Content - Notification Detail */}
            {selected && (
                <Box flex={1} p={3} overflow="auto">
                    {isMobile && (
                        <IconButton onClick={() => setSelected(null)} sx={{ mb: 2 }}>
                            <ArrowBackIcon />
                        </IconButton>
                    )}

                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                            p: 2,
                            background: "white",
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" fontWeight={600} color="#6f2da8">
                                {selected.notification_type}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.disabled"
                                display="block"
                                mt={0.5}
                            >
                                {selected.createdAt
                                    ? moment(selected.createdAt).format("lll")
                                    : ""}
                            </Typography>

                            <Typography variant="body1" mt={2} lineHeight={1.6}>
                                Ticket: {selected.ticket_Id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mt={1}>
                                Sender ID: {selected.senderId}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Recipient ID: {selected.recipientId}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Box>
    );
}

export default SuperAdminAllNotifications;

