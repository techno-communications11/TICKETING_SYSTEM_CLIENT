// // // // // // // import { createContext, useContext, useEffect, useState } from "react";
// // // // // // // import { io } from "socket.io-client";
// // // // // // // import Cookie from "js-cookie";

// // // // // // // const SocketContext = createContext();
// // // // // // // // 
// // // // // // // // const SOCKET_URL = 'https://ticketing-system-sever.onrender.com';
// // // // // // // // const SOCKET_URL = 'http://localhost:5000';
// // // // // // // const SOCKET_URL = 'https://ticketingapi.techno-communications.com'; 
// // // // // // // export const SocketProvider = ({ children }) => {
// // // // // // //     const [socket, setSocket] = useState(null);
// // // // // // //     const [connected, setConnected] = useState(false)
// // // // // // //     useEffect(() => {
// // // // // // //         const newSocket = io(SOCKET_URL, { autoConnect: true });
// // // // // // //         setSocket(newSocket);
// // // // // // //         newSocket.connect();
// // // // // // //         newSocket.on("connect", () => {
// // // // // // //             console.log("✅ Connected to Socket.io:", newSocket.id);
// // // // // // //             setConnected(true)
// // // // // // //             const userId = Cookie.get("id");
// // // // // // //             if (userId) {
// // // // // // //                 newSocket.emit("registerUser", userId);
// // // // // // //             }
// // // // // // //         });

// // // // // // //         newSocket.on("disconnect", () => {
// // // // // // //             console.log("❌ Disconnected from Socket.io");
// // // // // // //             setConnected(false)
// // // // // // //         });

// // // // // // //         return () => {
// // // // // // //             newSocket.disconnect();
// // // // // // //         };
// // // // // // //     }, []);

// // // // // // //     return <SocketContext.Provider value={{ socket, connected }}>{children}</SocketContext.Provider>;
// // // // // // // };

// // // // // // // export const useSocket = () => useContext(SocketContext);


// // // // // // import { createContext, useContext, useEffect, useState } from "react";
// // // // // // import { io } from "socket.io-client";
// // // // // // import Cookie from "js-cookie";

// // // // // // const SocketContext = createContext();

// // // // // // const SOCKET_URL = 'https://ticketingapi.techno-communications.com';

// // // // // // export const SocketProvider = ({ children }) => {
// // // // // //     const [socket, setSocket] = useState(null);
// // // // // //     const [connected, setConnected] = useState(false);

// // // // // //     useEffect(() => {
// // // // // //         let newSocket;

// // // // // //         const connectSocket = () => {
// // // // // //             if (!newSocket || !newSocket.connected) {
// // // // // //                 newSocket = io(SOCKET_URL, {
// // // // // //                     autoConnect: false,   // manual connect
// // // // // //                     reconnection: false,  // disable auto-reconnect
// // // // // //                 });

// // // // // //                 setSocket(newSocket);

// // // // // //                 newSocket.connect();

// // // // // //                 newSocket.on("connect", () => {
// // // // // //                     console.log("✅ Connected to Socket.io:", newSocket.id);
// // // // // //                     setConnected(true);

// // // // // //                     const userId = Cookie.get("id");
// // // // // //                     if (userId) {
// // // // // //                         newSocket.emit("registerUser", userId);
// // // // // //                     }
// // // // // //                 });

// // // // // //                 newSocket.on("disconnect", () => {
// // // // // //                     console.log("❌ Disconnected from Socket.io");
// // // // // //                     setConnected(false);
// // // // // //                 });
// // // // // //             }
// // // // // //         };

// // // // // //         // Agar internet available hai to connect karo
// // // // // //         if (navigator.onLine) {
// // // // // //             connectSocket();
// // // // // //         }

// // // // // //         // Internet chala jaye (offline)
// // // // // //         const handleOffline = () => {
// // // // // //             console.log("📴 Internet gone → closing socket");
// // // // // //             if (newSocket) {
// // // // // //                 newSocket.disconnect();
// // // // // //                 setConnected(false);
// // // // // //             }
// // // // // //         };

// // // // // //         // Internet aajaye (online)
// // // // // //         const handleOnline = () => {
// // // // // //             console.log("🌐 Internet restored → reconnecting socket");
// // // // // //             connectSocket();
// // // // // //         };

// // // // // //         window.addEventListener("offline", handleOffline);
// // // // // //         window.addEventListener("online", handleOnline);

// // // // // //         return () => {
// // // // // //             window.removeEventListener("offline", handleOffline);
// // // // // //             window.removeEventListener("online", handleOnline);
// // // // // //             if (newSocket) {
// // // // // //                 newSocket.disconnect();
// // // // // //             }
// // // // // //         };
// // // // // //     }, []);

// // // // // //     return (
// // // // // //         <SocketContext.Provider value={{ socket, connected }}>
// // // // // //             {children}
// // // // // //         </SocketContext.Provider>
// // // // // //     );
// // // // // // };

// // // // // // export const useSocket = () => useContext(SocketContext);


// // // // // import { createContext, useContext, useEffect, useState } from "react";
// // // // // import { io } from "socket.io-client";
// // // // // import Cookie from "js-cookie";

// // // // // const SocketContext = createContext();

// // // // // const SOCKET_URL = "https://ticketingapi.techno-communications.com";

// // // // // export const SocketProvider = ({ children }) => {
// // // // //     const [socket, setSocket] = useState(null);
// // // // //     const [connected, setConnected] = useState(false);
// // // // //     const [status, setStatus] = useState("online"); // "online" | "offline" | "connecting"
// // // // //     const [showConnectedMsg, setShowConnectedMsg] = useState(false);

// // // // //     useEffect(() => {
// // // // //         let newSocket;

// // // // //         // const connectSocket = () => {
// // // // //         //   if (!newSocket || !newSocket.connected) {
// // // // //         //     setStatus("connecting");
// // // // //         //     newSocket = io(SOCKET_URL, {
// // // // //         //       autoConnect: false,
// // // // //         //       reconnection: false,
// // // // //         //     });

// // // // //         //     setSocket(newSocket);
// // // // //         //     newSocket.connect();

// // // // //         //     newSocket.on("connect", () => {
// // // // //         //       console.log("✅ Connected to Socket.io:", newSocket.id);
// // // // //         //       setConnected(true);
// // // // //         //       setStatus("online");
// // // // //         //       setShowConnectedMsg(true);

// // // // //         //       const userId = Cookie.get("id");
// // // // //         //       if (userId) {
// // // // //         //         newSocket.emit("registerUser", userId);
// // // // //         //       }

// // // // //         //       // Hide "Connected" msg after 3 sec
// // // // //         //       setTimeout(() => setShowConnectedMsg(false), 3000);
// // // // //         //     });

// // // // //         //     newSocket.on("disconnect", () => {
// // // // //         //       console.log("❌ Disconnected from Socket.io");
// // // // //         //       setConnected(false);
// // // // //         //       setStatus("offline");
// // // // //         //     });
// // // // //         //   }
// // // // //         // };
// // // // //         const connectSocket = () => {
// // // // //             if (!newSocket || !newSocket.connected) {
// // // // //                 setStatus("connecting");
// // // // //                 newSocket = io(SOCKET_URL, {
// // // // //                     autoConnect: false,
// // // // //                     reconnection: true,              // ✅ allow reconnection
// // // // //                     reconnectionAttempts: Infinity,  // ✅ keep trying until success
// // // // //                     reconnectionDelay: 2000,         // 2s delay
// // // // //                     reconnectionDelayMax: 10000,     // max 10s delay
// // // // //                 });

// // // // //                 setSocket(newSocket);
// // // // //                 newSocket.connect();

// // // // //                 newSocket.on("connect", () => {
// // // // //                     console.log("✅ Connected to Socket.io:", newSocket.id);
// // // // //                     setConnected(true);
// // // // //                     setStatus("online");
// // // // //                     setShowConnectedMsg(true);

// // // // //                     const userId = Cookie.get("id");
// // // // //                     if (userId) {
// // // // //                         newSocket.emit("registerUser", userId);
// // // // //                     }

// // // // //                     setTimeout(() => setShowConnectedMsg(false), 3000);
// // // // //                 });

// // // // //                 newSocket.on("disconnect", (reason) => {
// // // // //                     console.log("❌ Disconnected:", reason);
// // // // //                     setConnected(false);
// // // // //                     if (navigator.onLine) {
// // // // //                         setStatus("connecting"); // server ya DNS issue
// // // // //                     } else {
// // // // //                         setStatus("offline");
// // // // //                     }
// // // // //                 });

// // // // //                 newSocket.io.on("reconnect_attempt", (attempt) => {
// // // // //                     console.log(`🔄 Reconnection attempt #${attempt}`);
// // // // //                     setStatus("connecting");
// // // // //                 });

// // // // //                 newSocket.io.on("reconnect_failed", () => {
// // // // //                     console.log("❌ Reconnection failed");
// // // // //                     setStatus("offline");
// // // // //                 });
// // // // //             }
// // // // //         };


// // // // //         // First connect only if internet is available
// // // // //         if (navigator.onLine) {
// // // // //             connectSocket();
// // // // //         } else {
// // // // //             setStatus("offline");
// // // // //         }

// // // // //         // Internet lost
// // // // //         const handleOffline = () => {
// // // // //             console.log("📴 Internet gone → closing socket");
// // // // //             setStatus("offline");
// // // // //             if (newSocket) {
// // // // //                 newSocket.disconnect();
// // // // //                 setConnected(false);
// // // // //             }
// // // // //         };

// // // // //         // Internet back
// // // // //         const handleOnline = () => {
// // // // //             console.log("🌐 Internet restored → reconnecting socket");
// // // // //             connectSocket();
// // // // //         };

// // // // //         window.addEventListener("offline", handleOffline);
// // // // //         window.addEventListener("online", handleOnline);

// // // // //         return () => {
// // // // //             window.removeEventListener("offline", handleOffline);
// // // // //             window.removeEventListener("online", handleOnline);
// // // // //             if (newSocket) {
// // // // //                 newSocket.disconnect();
// // // // //             }
// // // // //         };
// // // // //     }, []);

// // // // //     return (
// // // // //         <SocketContext.Provider value={{ socket, connected, status, showConnectedMsg }}>
// // // // //             {children}
// // // // //         </SocketContext.Provider>
// // // // //     );
// // // // // };

// // // // // export const useSocket = () => useContext(SocketContext);




// // // // import { createContext, useContext, useEffect, useState } from "react";
// // // // import { io } from "socket.io-client";
// // // // import Cookie from "js-cookie";

// // // // const SocketContext = createContext();
// // // // const SOCKET_URL = "https://ticketingapi.techno-communications.com";

// // // // export const SocketProvider = ({ children }) => {
// // // //     const [socket, setSocket] = useState(null);
// // // //     const [connected, setConnected] = useState(false);

// // // //     // UI status states
// // // //     const [status, setStatus] = useState("online"); // "online" | "offline" | "connecting"
// // // //     const [attempt, setAttempt] = useState(0);

// // // //     useEffect(() => {
// // // //         let newSocket;

// // // //         const connectSocket = () => {
// // // //             if (newSocket && newSocket.connected) return; // prevent duplicate

// // // //             newSocket = io(SOCKET_URL, {
// // // //                 autoConnect: false,
// // // //                 reconnection: true,
// // // //                 reconnectionAttempts: 5, // ✅ max 5 tries
// // // //                 reconnectionDelay: 2000,
// // // //                 reconnectionDelayMax: 10000,
// // // //             });

// // // //             setSocket(newSocket);
// // // //             newSocket.connect();

// // // //             // ✅ On connect
// // // //             newSocket.on("connect", () => {
// // // //                 console.log("✅ Connected:", newSocket.id);
// // // //                 setConnected(true);
// // // //                 setStatus("online");
// // // //                 setAttempt(0);

// // // //                 const userId = Cookie.get("id");
// // // //                 if (userId) {
// // // //                     newSocket.emit("registerUser", userId);
// // // //                 }
// // // //             });

// // // //             // ❌ On disconnect
// // // //             newSocket.on("disconnect", (reason) => {
// // // //                 console.log("❌ Disconnected:", reason);
// // // //                 setConnected(false);
// // // //                 if (navigator.onLine) {
// // // //                     setStatus("connecting");
// // // //                 } else {
// // // //                     setStatus("offline");
// // // //                 }
// // // //             });

// // // //             // 🔄 Reconnection events
// // // //             newSocket.io.on("reconnect_attempt", (num) => {
// // // //                 console.log(`🔄 Reconnecting... Attempt ${num}`);
// // // //                 setAttempt(num);
// // // //                 setStatus("connecting");
// // // //             });

// // // //             newSocket.io.on("reconnect_failed", () => {
// // // //                 console.log("❌ Reconnection failed after max attempts");
// // // //                 setStatus("offline");
// // // //             });
// // // //         };

// // // //         // First connect
// // // //         connectSocket();

// // // //         // Internet status listeners
// // // //         const handleOnline = () => {
// // // //             console.log("🌐 Internet restored → reconnecting...");
// // // //             setStatus("connecting");
// // // //             connectSocket();
// // // //         };

// // // //         const handleOffline = () => {
// // // //             console.log("📴 Internet gone → closing socket");
// // // //             setStatus("offline");
// // // //             if (newSocket) newSocket.disconnect();
// // // //         };

// // // //         window.addEventListener("online", handleOnline);
// // // //         window.addEventListener("offline", handleOffline);

// // // //         return () => {
// // // //             if (newSocket) newSocket.disconnect();
// // // //             window.removeEventListener("online", handleOnline);
// // // //             window.removeEventListener("offline", handleOffline);
// // // //         };
// // // //     }, []);

// // // //     // Auto hide "Connected" message after 3s
// // // //     useEffect(() => {
// // // //         if (status === "online") {
// // // //             const timer = setTimeout(() => setStatus(""), 3000);
// // // //             return () => clearTimeout(timer);
// // // //         }
// // // //     }, [status]);

// // // //     return (
// // // //         <SocketContext.Provider value={{ socket, connected }}>
// // // //             {children}

// // // //             {/* 🔔 Global Center Alert */}
// // // //             {status && (
// // // //                 <div
// // // //                     style={{
// // // //                         position: "fixed",
// // // //                         top: "50%",
// // // //                         left: "50%",
// // // //                         transform: "translate(-50%, -50%)",
// // // //                         background:
// // // //                             status === "offline"
// // // //                                 ? "#e74c3c"
// // // //                                 : status === "connecting"
// // // //                                     ? "#f1c40f"
// // // //                                     : "#2ecc71",
// // // //                         color: "white",
// // // //                         padding: "14px 28px",
// // // //                         borderRadius: "10px",
// // // //                         fontWeight: "bold",
// // // //                         zIndex: 9999,
// // // //                         textAlign: "center",
// // // //                         boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
// // // //                     }}
// // // //                 >
// // // //                     {status === "offline" && "📴 No Internet"}
// // // //                     {status === "connecting" && `🔄 Reconnecting... (Attempt ${attempt})`}
// // // //                     {status === "online" && "✅ Connected"}
// // // //                 </div>
// // // //             )}
// // // //         </SocketContext.Provider>
// // // //     );
// // // // };

// // // // export const useSocket = () => useContext(SocketContext);



// // // import { createContext, useContext, useEffect, useState } from "react";
// // // import { io } from "socket.io-client";
// // // import Cookie from "js-cookie";
// // // import Snackbar from "@mui/material/Snackbar";
// // // import Alert from "@mui/material/Alert";
// // // import WifiOffIcon from "@mui/icons-material/WifiOff";
// // // import SyncIcon from "@mui/icons-material/Sync";
// // // import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// // // const SocketContext = createContext();
// // // const SOCKET_URL = "https://ticketingapi.techno-communications.com";

// // // export const SocketProvider = ({ children }) => {
// // //     const [socket, setSocket] = useState(null);
// // //     const [connected, setConnected] = useState(false);

// // //     // UI status states
// // //     const [status, setStatus] = useState("online"); // "online" | "offline" | "connecting"
// // //     const [attempt, setAttempt] = useState(0);
// // //     const [open, setOpen] = useState(false);

// // //     useEffect(() => {
// // //         let newSocket;

// // //         const connectSocket = () => {
// // //             if (newSocket && newSocket.connected) return; // prevent duplicate

// // //             newSocket = io(SOCKET_URL, {
// // //                 autoConnect: false,
// // //                 reconnection: true,
// // //                 reconnectionAttempts: 5, // ✅ max 5 tries
// // //                 reconnectionDelay: 2000,
// // //                 reconnectionDelayMax: 10000,
// // //             });

// // //             setSocket(newSocket);
// // //             newSocket.connect();

// // //             // ✅ On connect
// // //             newSocket.on("connect", () => {
// // //                 console.log("✅ Connected:", newSocket.id);
// // //                 setConnected(true);
// // //                 setStatus("online");
// // //                 setAttempt(0);
// // //                 setOpen(true);

// // //                 const userId = Cookie.get("id");
// // //                 if (userId) {
// // //                     newSocket.emit("registerUser", userId);
// // //                 }
// // //             });

// // //             // ❌ On disconnect
// // //             newSocket.on("disconnect", (reason) => {
// // //                 console.log("❌ Disconnected:", reason);
// // //                 setConnected(false);
// // //                 if (navigator.onLine) {
// // //                     setStatus("connecting");
// // //                 } else {
// // //                     setStatus("offline");
// // //                 }
// // //                 setOpen(true);
// // //             });

// // //             // 🔄 Reconnection events
// // //             newSocket.io.on("reconnect_attempt", (num) => {
// // //                 console.log(`🔄 Reconnecting... Attempt ${num}`);
// // //                 setAttempt(num);
// // //                 setStatus("connecting");
// // //                 setOpen(true);
// // //             });

// // //             newSocket.io.on("reconnect_failed", () => {
// // //                 console.log("❌ Reconnection failed after max attempts");
// // //                 setStatus("offline");
// // //                 setOpen(true);
// // //             });
// // //         };

// // //         // First connect
// // //         connectSocket();

// // //         // Internet status listeners
// // //         const handleOnline = () => {
// // //             console.log("🌐 Internet restored → reconnecting...");
// // //             setStatus("connecting");
// // //             setOpen(true);
// // //             connectSocket();
// // //         };

// // //         const handleOffline = () => {
// // //             console.log("📴 Internet gone → closing socket");
// // //             setStatus("offline");
// // //             setOpen(true);
// // //             if (newSocket) newSocket.disconnect();
// // //         };

// // //         window.addEventListener("online", handleOnline);
// // //         window.addEventListener("offline", handleOffline);

// // //         return () => {
// // //             if (newSocket) newSocket.disconnect();
// // //             window.removeEventListener("online", handleOnline);
// // //             window.removeEventListener("offline", handleOffline);
// // //         };
// // //     }, []);

// // //     // Auto hide "Connected" after 3s
// // //     useEffect(() => {
// // //         if (status === "online") {
// // //             const timer = setTimeout(() => setOpen(false), 3000);
// // //             return () => clearTimeout(timer);
// // //         }
// // //     }, [status]);

// // //     return (
// // //         <SocketContext.Provider value={{ socket, connected }}>
// // //             {children}

// // //             {/* 🔔 Material UI Snackbar + Alert */}
// // //             <Snackbar
// // //                 open={open}
// // //                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
// // //                 onClose={() => setOpen(false)}
// // //                 autoHideDuration={status === "online" ? 3000 : null} // auto close only for success
// // //             >
// // //                 {status === "offline" && (
// // //                     <Alert
// // //                         severity="error"
// // //                         icon={<WifiOffIcon fontSize="inherit" />}
// // //                         sx={{ fontWeight: "bold" }}
// // //                     >
// // //                         No Internet
// // //                     </Alert>
// // //                 )}

// // //                 {status === "connecting" && (
// // //                     <Alert
// // //                         severity="warning"
// // //                         icon={<SyncIcon fontSize="inherit" />}
// // //                         sx={{ fontWeight: "bold" }}
// // //                     >
// // //                         Reconnecting... (Attempt {attempt})
// // //                     </Alert>
// // //                 )}

// // //                 {status === "online" && (
// // //                     <Alert
// // //                         severity="success"
// // //                         icon={<CheckCircleIcon fontSize="inherit" />}
// // //                         sx={{ fontWeight: "bold" }}
// // //                     >
// // //                         Connected
// // //                     </Alert>
// // //                 )}
// // //             </Snackbar>
// // //         </SocketContext.Provider>
// // //     );
// // // };

// // // export const useSocket = () => useContext(SocketContext);


// // import { createContext, useContext, useEffect, useState } from "react";
// // import { io } from "socket.io-client";
// // import Cookie from "js-cookie";
// // import Snackbar from "@mui/material/Snackbar";
// // import Alert from "@mui/material/Alert";
// // import WifiOffIcon from "@mui/icons-material/WifiOff";
// // import SyncIcon from "@mui/icons-material/Sync";
// // import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// // const SocketContext = createContext();
// // const SOCKET_URL = "https://ticketingapi.techno-communications.com";

// // export const SocketProvider = ({ children }) => {
// //   const [socket, setSocket] = useState(null);
// //   const [connected, setConnected] = useState(false);

// //   // UI status states
// //   const [status, setStatus] = useState("online"); // "online" | "offline" | "connecting"
// //   const [attempt, setAttempt] = useState(0);
// //   const [open, setOpen] = useState(false);

// //   useEffect(() => {
// //     let newSocket;

// //     const connectSocket = () => {
// //       if (newSocket && newSocket.connected) return; // prevent duplicate

// //       newSocket = io(SOCKET_URL, {
// //         autoConnect: false,
// //         reconnection: true,
// //         reconnectionAttempts: 5, // ✅ max 5 tries
// //         reconnectionDelay: 2000,
// //         reconnectionDelayMax: 10000,
// //       });

// //       setSocket(newSocket);
// //       newSocket.connect();

// //       // ✅ On connect
// //       newSocket.on("connect", () => {
// //         console.log("✅ Connected:", newSocket.id);
// //         setConnected(true);
// //         setStatus("online");
// //         setAttempt(0);
// //         setOpen(true);

// //         const userId = Cookie.get("id");
// //         if (userId) {
// //           newSocket.emit("registerUser", userId);
// //         }
// //       });

// //       // ❌ On disconnect
// //       newSocket.on("disconnect", (reason) => {
// //         console.log("❌ Disconnected:", reason);
// //         setConnected(false);
// //         if (navigator.onLine) {
// //           setStatus("connecting");
// //         } else {
// //           setStatus("offline");
// //         }
// //         setOpen(true);
// //       });

// //       // 🔄 Reconnection events
// //       newSocket.io.on("reconnect_attempt", (num) => {
// //         console.log(`🔄 Reconnecting... Attempt ${num}`);
// //         setAttempt(num);
// //         setStatus("connecting");
// //         setOpen(true);
// //       });

// //       newSocket.io.on("reconnect_failed", () => {
// //         console.log("❌ Reconnection failed after max attempts");
// //         setStatus("offline");
// //         setOpen(true);
// //       });
// //     };

// //     // First connect
// //     connectSocket();

// //     // Internet status listeners
// //     const handleOnline = () => {
// //       console.log("🌐 Internet restored → reconnecting...");
// //       setStatus("connecting");
// //       setOpen(true);
// //       connectSocket();
// //     };

// //     const handleOffline = () => {
// //       console.log("📴 Internet gone → closing socket");
// //       setStatus("offline");
// //       setOpen(true);
// //       if (newSocket) newSocket.disconnect();
// //     };

// //     window.addEventListener("online", handleOnline);
// //     window.addEventListener("offline", handleOffline);

// //     return () => {
// //       if (newSocket) newSocket.disconnect();
// //       window.removeEventListener("online", handleOnline);
// //       window.removeEventListener("offline", handleOffline);
// //     };
// //   }, []);

// //   // Auto hide "Connected" after 3s
// //   useEffect(() => {
// //     if (status === "online") {
// //       const timer = setTimeout(() => setOpen(false), 3000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [status]);

// //   // ✅ Ek hi Alert child banate hain
// //   const getAlert = () => {
// //     if (status === "offline") {
// //       return (
// //         <Alert
// //           severity="error"
// //           icon={<WifiOffIcon fontSize="inherit" />}
// //           className="shadow-sm"
// //           sx={{ fontWeight: "bold", width: "100%" }}
// //         >
// //           No Internet
// //         </Alert>
// //       );
// //     }
// //     if (status === "connecting") {
// //       return (
// //         <Alert
// //           severity="warning"
// //           icon={<SyncIcon fontSize="inherit" />}
// //           className="shadow-sm"
// //           sx={{ fontWeight: "bold", width: "100%" }}
// //         >
// //           Reconnecting... (Attempt {attempt})
// //         </Alert>
// //       );
// //     }
// //     if (status === "online") {
// //       return (
// //         <Alert
// //           severity="success"
// //           icon={<CheckCircleIcon fontSize="inherit" />}
// //           className="shadow-sm"
// //           sx={{ fontWeight: "bold", width: "100%" }}
// //         >
// //           Connected
// //         </Alert>
// //       );
// //     }
// //     return null;
// //   };

// //   return (
// //     <SocketContext.Provider value={{ socket, connected }}>
// //       {children}

// //       {/* 🔔 Material UI Snackbar with single Alert child */}
// //       <Snackbar
// //         open={open}
// //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
// //         onClose={() => setOpen(false)}
// //         autoHideDuration={status === "online" ? 3000 : null}
// //         className="mt-3"
// //         sx={{ width: "100%", maxWidth: "500px" }}
// //       >
// //         {getAlert()}
// //       </Snackbar>
// //     </SocketContext.Provider>
// //   );
// // };

// // export const useSocket = () => useContext(SocketContext);




// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import Cookie from "js-cookie";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import WifiOffIcon from "@mui/icons-material/WifiOff";
// import SyncIcon from "@mui/icons-material/Sync";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// const SocketContext = createContext();
// const SOCKET_URL = "https://ticketingapi.techno-communications.com";

// export const SocketProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null);
//     const [connected, setConnected] = useState(false);

//     // UI states
//     const [status, setStatus] = useState("online"); // "online" | "offline" | "connecting"
//     const [attempt, setAttempt] = useState(0);
//     const [open, setOpen] = useState(false);

//     useEffect(() => {
//         let newSocket;

//         const connectSocket = () => {
//             if (newSocket && newSocket.connected) return;

//             newSocket = io(SOCKET_URL, {
//                 autoConnect: false,
//                 reconnection: true,
//                 reconnectionAttempts: 5,
//                 reconnectionDelay: 2000,
//                 reconnectionDelayMax: 10000,
//             });

//             setSocket(newSocket);
//             newSocket.connect();

//             // ✅ Connected
//             newSocket.on("connect", () => {
//                 console.log("✅ Connected:", newSocket.id);
//                 setConnected(true);
//                 setStatus("online");
//                 setAttempt(0);
//                 setOpen(true);

//                 const userId = Cookie.get("id");
//                 if (userId) newSocket.emit("registerUser", userId);
//             });

//             // ❌ Disconnected
//             newSocket.on("disconnect", (reason) => {
//                 console.log("❌ Disconnected:", reason);
//                 setConnected(false);
//                 if (navigator.onLine) {
//                     setStatus("connecting");
//                 } else {
//                     setStatus("offline");
//                 }
//                 setOpen(true);
//             });

//             // 🔄 Reconnecting
//             newSocket.io.on("reconnect_attempt", (num) => {
//                 console.log(`🔄 Reconnecting... Attempt ${num}`);
//                 setAttempt(num);
//                 setStatus("connecting");
//                 setOpen(true);
//             });

//             newSocket.io.on("reconnect_failed", () => {
//                 console.log("❌ Reconnection failed after max attempts");
//                 setStatus("offline");
//                 setOpen(true);
//             });
//         };

//         connectSocket();

//         // Internet listeners
//         const handleOnline = () => {
//             console.log("🌐 Internet restored → reconnecting...");
//             setStatus("connecting");
//             setOpen(true);
//             connectSocket();
//         };

//         const handleOffline = () => {
//             console.log("📴 Internet gone → closing socket");
//             setStatus("offline");
//             setOpen(true);
//             if (newSocket) newSocket.disconnect();
//         };

//         window.addEventListener("online", handleOnline);
//         window.addEventListener("offline", handleOffline);

//         return () => {
//             if (newSocket) newSocket.disconnect();
//             window.removeEventListener("online", handleOnline);
//             window.removeEventListener("offline", handleOffline);
//         };
//     }, []);

//     // ✅ Hide only when Connected
//     useEffect(() => {
//         if (status === "online") {
//             const timer = setTimeout(() => setOpen(false), 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [status]);

//     // Single Alert Renderer
//     const getAlert = () => {
//         if (status === "offline") {
//             return (
//                 <Alert
//                     severity="error"
//                     icon={<WifiOffIcon fontSize="inherit" />}
//                     className="shadow-sm"
//                     sx={{ fontWeight: "bold", width: "100%" }}
//                 >
//                     No Internet
//                 </Alert>
//             );
//         }
//         if (status === "connecting") {
//             return (
//                 <Alert
//                     severity="warning"
//                     icon={<SyncIcon fontSize="inherit" />}
//                     className="shadow-sm"
//                     sx={{ fontWeight: "bold", width: "100%" }}
//                 >
//                     Reconnecting... (Attempt {attempt})
//                 </Alert>
//             );
//         }
//         if (status === "online") {
//             return (
//                 <Alert
//                     severity="success"
//                     icon={<CheckCircleIcon fontSize="inherit" />}
//                     className="shadow-sm"
//                     sx={{ fontWeight: "bold", width: "100%" }}
//                 >
//                     Connected
//                 </Alert>
//             );
//         }
//         return null;
//     };

//     return (
//         <SocketContext.Provider value={{ socket, connected }}>
//             {children}

//             {/* Snackbar for Alerts */}
//             <Snackbar
//                 open={open}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//                 onClose={() => setOpen(false)}
//                 autoHideDuration={status === "online" ? 3000 : null} // ✅ Only hide on "Connected"
//                 sx={{ width: "100%", maxWidth: "500px" }}
//             >
//                 {getAlert()}
//             </Snackbar>
//         </SocketContext.Provider>
//     );
// };

// export const useSocket = () => useContext(SocketContext);




import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookie from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import SyncIcon from "@mui/icons-material/Sync";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SocketContext = createContext();
const SOCKET_URL = "https://ticketingapi.techno-communications.com";
// const SOCKET_URL = "http://localhost:5000";

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    const [status, setStatus] = useState("online"); // "online" | "offline" | "connecting"
    const [attempt, setAttempt] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let newSocket;

        const connectSocket = () => {
            if (newSocket && newSocket.connected) return;

            newSocket = io(SOCKET_URL, {
                autoConnect: false,
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 2000,
                reconnectionDelayMax: 10000,
            });

            setSocket(newSocket);
            newSocket.connect();

            // ✅ Connected
            newSocket.on("connect", () => {
                // console.log("✅ Connected:", newSocket.id);
                setConnected(true);
                setStatus("online");
                setAttempt(0);
                setOpen(true);

                const userId = Cookie.get("id");
                if (userId) newSocket.emit("registerUser", userId);
            });

            // ❌ Disconnected
            newSocket.on("disconnect", (reason) => {
                // console.log("❌ Disconnected:", reason);
                setConnected(false);
                if (navigator.onLine) {
                    setStatus("connecting");
                } else {
                    setStatus("offline");
                }
                setOpen(true);
            });

            // 🔄 Reconnecting
            newSocket.io.on("reconnect_attempt", (num) => {
                // console.log(`🔄 Reconnecting... Attempt ${num}`);
                setAttempt(num);
                setStatus("connecting");
                setOpen(true);
            });

            newSocket.io.on("reconnect_failed", () => {
                // console.log("❌ Reconnection failed after max attempts");
                setStatus("offline");
                setOpen(true);
            });
        };

        connectSocket();

        // Internet listeners
        const handleOnline = () => {
            // console.log("🌐 Internet restored → reconnecting...");
            setStatus("connecting");
            setOpen(true);
            connectSocket();
        };

        const handleOffline = () => {
            // console.log("📴 Internet gone → closing socket");
            setStatus("offline");
            setOpen(true);
            if (newSocket) newSocket.disconnect();
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            if (newSocket) newSocket.disconnect();
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    // ✅ Only auto-hide when Connected
    useEffect(() => {
        if (status === "online") {
            const timer = setTimeout(() => setOpen(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    // Single Alert Renderer
    const getAlert = () => {
        if (status === "offline") {
            return (
                <Alert
                    severity="error"
                    icon={<WifiOffIcon fontSize="inherit" />}
                    sx={{ fontWeight: "bold", width: "100%" }}
                >
                    No Internet
                </Alert>
            );
        }
        if (status === "connecting") {
            return (
                <Alert
                    severity="warning"
                    icon={<SyncIcon fontSize="inherit" />}
                    sx={{ fontWeight: "bold", width: "100%" }}
                >
                    Reconnecting... (Attempt {attempt})
                </Alert>
            );
        }
        if (status === "online") {
            return (
                <Alert
                    severity="success"
                    icon={<CheckCircleIcon fontSize="inherit" />}
                    sx={{ fontWeight: "bold", width: "100%" }}
                >
                    Connected
                </Alert>
            );
        }
        return null;
    };

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {children}

            {/* Snackbar for Alerts */}
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setOpen(false)}
                autoHideDuration={status === "online" ? 3000 : null} // ✅ Only "online" auto hides
                sx={{ width: "100%", maxWidth: "500px" }}
            >
                {getAlert()}
            </Snackbar>
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
