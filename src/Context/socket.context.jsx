import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookie from "js-cookie";

const SocketContext = createContext();
// 
// const SOCKET_URL = 'https://ticketing-system-sever.onrender.com';
const SOCKET_URL = 'http://localhost:5000';
// const SOCKET_URL = 'https://ticketingapi.techno-communications.com'; 
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false)
    useEffect(() => {
        const newSocket = io(SOCKET_URL, { autoConnect: true });
        setSocket(newSocket);
        newSocket.connect();
        newSocket.on("connect", () => {
            console.log("✅ Connected to Socket.io:", newSocket.id);
            setConnected(true)
            const userId = Cookie.get("id");
            if (userId) {
                newSocket.emit("registerUser", userId);
            }
        });

        newSocket.on("disconnect", () => {
            console.log("❌ Disconnected from Socket.io");
            setConnected(false)
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return <SocketContext.Provider value={{ socket, connected }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
