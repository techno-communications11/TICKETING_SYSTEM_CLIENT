import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Avatar,
  Badge,
  Typography,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Button,
  Paper,
  keyframes,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useSocket } from "../Context/socket.context";
import cookie from 'js-cookie'
import { getAllUser } from "../Services/auth.services";
import { useNavigate, useParams } from "react-router-dom";
import { getAllMessageServices } from "../Services/chatmessages.services";
// Double Blink Animation
const doubleBlink = keyframes`
  0% { box-shadow: 0 0 8px rgba(46, 125, 50, 0.9); opacity: 1; }
  25% { box-shadow: 0 0 16px rgba(46, 125, 50, 0.9); opacity: 0.5; }
  50% { box-shadow: 0 0 8px rgba(46, 125, 50, 0.9); opacity: 1; }
  75% { box-shadow: 0 0 16px rgba(46, 125, 50, 0.9); opacity: 0.5; }
  100% { box-shadow: 0 0 8px rgba(46, 125, 50, 0.9); opacity: 1; }
`;


export default function ChatSystem() {
  const UserId = cookie.get("id");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState({}); // per chat
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [allUsersData, setAllUsersData] = useState();
  const chatBoxRef = useRef(null);
  const currentUserId = 1;
  const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB
  const navigate = useNavigate()
  const { socket } = useSocket();

  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search term
  const filteredUsers = allUsersData?.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.techId?.toString().includes(term)
    );
  });

  // const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]); // in-portal notifications

  const [isTabActive, setIsTabActive] = useState(true);
  // console.log(id)
  const fetchGetAllUsersData = useCallback(async () => {
    try {
      const responseUsers = await getAllUser();
      const filterationData = responseUsers.data.data.filter((data) => data.id != UserId)
      setAllUsersData(filterationData)
    } catch (error) {
      console.log("ERROR", error.message);
    }
  }, [])
  // console.log(onlineUsers)
  useEffect(() => {
    fetchGetAllUsersData();
  }, [fetchGetAllUsersData])
  useEffect(() => {
    if (id && allUsersData.length > 0) {
      const user = allUsersData.filter((item) => item.id == id);
      const fetchMessages = async () => {
        // setloadingMessages(true);
        try {
          const response = await getAllMessageServices(user[0].id, UserId);
          // setloadingMessages(false);
          setMessages(response.data.data);
          
          console.log(response.data.data);
        } catch (error) {
          console.error("Error fetching messages:", error.message);
        }
      };
      fetchMessages();
    }
  }, [id, allUsersData, currentUserId]);
  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on("connect", () => {
  //     console.log("Connected to server");
  //     socket.emit("register", UserId);
  //   });

  //   socket.on("connect_error", (error) => {
  //     console.error("Connection error:", error.message);
  //   });
  //   socket.on("chat message", (msg) => {
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });
  //   socket.on("notification", ({ senderId,receiver, content }) => {
  //     const sender = allUsersData.find((user) => user.id === senderId);
  //     if (sender) {
  //       const name = sender.name;
  //       const department = sender.department;
  //       const notificationMessage = `${content} (${department})`;
  //       if (!isTabActive) {
  //         showBrowserNotification(name, notificationMessage);
  //       }
  //     }
  //   });
  //   socket.emit("getOnlineUsers");
  //   socket.on("updateOnlineUsers", (users) => {
  //     setOnlineUsers(users);
  //   });
  //   return () => {
  //     if (socket) {
  //       socket.off("updateOnlineUsers");
  //       socket.off("connect");
  //       socket.off("connect_error");
  //       socket.off("chat message");
  //       socket.off("notification");
  //     }
  //   };
  // }, [socket, UserId, allUsersData]);

  // const showBrowserNotification = (name, message) => {
  //   const notificationTitle = `New Message from ${name}`;
  //   const notificationBody = message;
  //   if (Notification.permission === "granted") {
  //     new Notification(notificationTitle, { body: notificationBody });
  //   } else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         new Notification(notificationTitle, { body: notificationBody });
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    if (!socket) return;

    // Track tab focus/blur
    const handleFocus = () => setIsTabActive(true);
    const handleBlur = () => setIsTabActive(false);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    socket.on("connect", () => {
      console.log("✅ Connected to server");
      socket.emit("register", UserId);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error.message);
    });

    // Receive new chat messages
    socket.on("chat message", (msg) => {
      console.log("📩 New message received:", msg);
      setMessages((prev) => [...prev, msg]);

      // Show browser + portal notification if it's NOT my own message
      if (msg.receiver == UserId) {
        const senderUser = allUsersData.find((u) => u.id == msg.sender);
        const senderName = senderUser ? senderUser.name : "Unknown";
        const dept = senderUser ? senderUser.department : "";

        const notifyText = msg.content || "📷 Media message received";

        if (!isTabActive) {
          showBrowserNotification(senderName, `${notifyText} (${dept})`);
        }

        setNotifications((prev) => [
          ...prev,
          { id: Date.now(), senderName, dept, text: notifyText },
        ]);
      }
    });

    // Receive system notifications (from backend emit)
    socket.on("notification", ({ sender, receiver, content }) => {
      if (receiver == UserId) {
        const senderUser = allUsersData.find((u) => u.id == sender);
        const senderName = senderUser ? senderUser.name : "Unknown";
        const dept = senderUser ? senderUser.department : "";

        if (!isTabActive) {
          showBrowserNotification(senderName, content);
        }

        setNotifications((prev) => [
          ...prev,
          { id: Date.now(), senderName, dept, text: content },
        ]);
      }
    });

    socket.emit("getOnlineUsers");
    socket.on("updateOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("connect_error");
        socket.off("chat message");
        socket.off("notification");
        socket.off("updateOnlineUsers");
      }
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [socket, UserId, allUsersData, isTabActive]);

  // Browser notification
  const showBrowserNotification = (name, message) => {
    const notificationTitle = `💬 New message from ${name}`;
    const notificationBody = message;

    if (Notification.permission === "granted") {
      new Notification(notificationTitle, { body: notificationBody });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(notificationTitle, { body: notificationBody });
        }
      });
    }
  };


  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, selectedUser, recordings]);

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      // console.log(inputValue)
      const messageData = {
        sender: UserId,
        receiver: id,
        content: inputValue,
        image: null,
      };
      console.log(messageData)
      console.log("id", id)
      socket.emit("chat message", messageData);
      setMessages([
        ...messages,
        {
          id: Date.now(),
          sender: UserId,
          content: inputValue,
          type: "text",
          timestamp: Date.now(),
        },
      ]);
      setInputValue("");
    }
  };

  // Menu
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // File upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 16MB limit.");
      return;
    }

    let type = "file";
    if (file.type.startsWith("image/")) type = "image";
    else if (file.type.startsWith("video/")) type = "video";
    else if (file.type === "audio/mpeg" || file.type.startsWith("audio/")) type = "audio";

    const fileURL = URL.createObjectURL(file);

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: currentUserId,
        content: fileURL,
        fileName: file.name,
        type,
        timestamp: Date.now(),
      },
    ]);

    e.target.value = null; // reset input
  };

  // Voice recording
  const handleStartRecording = async () => {
    if (!selectedUser) return;

    if (recording) {
      mediaRecorderRef.current.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);

        setRecordings((prev) => {
          const prevRecordings = prev[selectedUser.id] || [];
          return { ...prev, [selectedUser.id]: [...prevRecordings, { url, blob }] };
        });

        setRecording(false);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied", err);
      alert("Cannot access microphone");
    }
  };
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        {/* Sidebar */}
        <div
          className={`col-md-3 border-end d-md-block ${selectedUser ? "d-none d-md-block" : "d-block"
            }`}
          style={{ overflowY: "auto", height: "100vh", background: "#f5f5f5" }}
        >
          {/* Header */}
          <Box
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid #ddd"
            bgcolor="white"
          >
            <IconButton onClick={() => window.history.back()} sx={{ color: "black" }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">
              Chats
            </Typography>
          </Box>
          <Box p={2}>
            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Search by name or tech ID"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* User Cards */}
            {filteredUsers?.map((user) => {
              const ids = user.id.toString();

              return (
                <Card
                  key={user.id}
                  sx={{ mb: 2, cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/chat-system/${user.id}`);
                    setSelectedUser(user);
                  }}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        onlineUsers.includes(ids) ? (
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              backgroundColor: "#2E7D32",
                              borderRadius: "50%",
                              animation: `${doubleBlink} 1.5s infinite`,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              backgroundColor: "#757575",
                              borderRadius: "10px",
                            }}
                          />
                        )
                      }
                    >
                      <Avatar
                        src={user.name.toUpperCase().charAt(0)}
                        alt={user.name.toUpperCase().charAt(0)}
                        sx={{ width: 56, height: 56 }}
                      />
                    </Badge>
                    <Box ml={2}>
                      <Typography fontWeight="bold">{user.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dept: {user.department}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tech ID: {user.techId}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
          {/* <Box p={2}>
            {allUsersData?.map((user) => {
              const ids = user.id.toString()
              // console.log(onlineUsers.includes(ids));

              // console.log("onlineUsers", onlineUsers)
              // console.log(user.id)

              return (
                <Card key={user.id} sx={{ mb: 2, cursor: "pointer" }} onClick={() => { navigate(`/chat-system/${user.id}`); setSelectedUser(user) }}>
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        onlineUsers.includes(ids) ? (
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              backgroundColor: '#2E7D32',
                              borderRadius: '50%',
                              animation: `${doubleBlink} 1.5s infinite`,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              backgroundColor: '#757575',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontSize: '10px',
                              fontWeight: 'bold',
                              padding: '2px 4px',
                            }}
                          />
                        )
                      }
                    >
                      <Avatar
                        src={user.name.toUpperCase().charAt(0)}
                        alt={user.name.toUpperCase().charAt(0)}
                        sx={{ width: 56, height: 56 }}
                      />
                    </Badge>
                    <Box ml={2}>
                      <Typography fontWeight="bold">{user.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dept: {user.department}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )
            })}
          </Box> */}
        </div>

        {/* Chat Window */}
        <div className={`col-md-9 d-md-block ${selectedUser ? "d-block" : "d-none d-md-block"}`}>
          {selectedUser ? (
            <div className="d-flex flex-column h-100">
              {/* Header */}
              <Box
                px={2}
                py={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bgcolor="white"
                borderBottom="1px solid #ddd"
              >
                <Box display="flex" alignItems="center">
                  <IconButton
                    sx={{ display: { md: "none", xs: "inline-flex" }, color: "black" }}
                    onClick={() => setSelectedUser(null)}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  {/* {
                    console.log(selectedUser.id)
                  } */}
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      onlineUsers.includes(selectedUser.id.toString()) ? (
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            backgroundColor: '#2E7D32',
                            borderRadius: '50%',
                            animation: `${doubleBlink} 1.5s infinite`,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 50,
                            height: 20,
                            backgroundColor: '#757575',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            padding: '2px 4px',
                          }}
                        >
                          ⚫ Offline
                        </Box>
                      )
                    }
                  >
                    <Avatar sx={{ ml: { xs: 1, md: 0 } }}>{selectedUser.name.charAt(0)}</Avatar>
                  </Badge>
                  <Box ml={2}>
                    <Typography fontWeight="bold">{selectedUser.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {onlineUsers.includes(selectedUser.id.toString()) ? "Online" : "Offline"}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton onClick={handleMenuOpen} sx={{ color: "black" }}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem>
                      <PhoneIcon sx={{ mr: 1 }} /> Voice Call
                    </MenuItem>
                    <MenuItem>
                      <VideocamIcon sx={{ mr: 1 }} /> Video Call
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>

              {/* Messages */}
              <Box
                ref={chatBoxRef}
                flexGrow={1}
                p={2}
                overflow="auto"
                bgcolor="#fafafa"
                style={{ height: "calc(100vh - 150px)" }}
              >
                {/* {messages
                  .filter((m) => [currentUserId, selectedUser.id].includes(m.sender))
                  .map((msg) => {
                    const isCurrentUser = msg.sender === currentUserId;

                    return (
                      <Box
                        key={msg.id}
                        display="flex"
                        justifyContent={isCurrentUser ? "flex-end" : "flex-start"}
                        mb={2}
                      >
                        <Box
                          px={2}
                          py={1}
                          borderRadius={2}
                          maxWidth="60%"
                          bgcolor={isCurrentUser ? "primary.main" : "grey.300"}
                          color={isCurrentUser ? "white" : "black"}
                        >
                          {msg.type === "text" && <Typography>{msg.content}</Typography>}
                          {msg.type === "image" && (
                            <img src={msg.content} alt="" style={{ maxWidth: "100%", borderRadius: 8 }} />
                          )}
                          {msg.type === "video" && (
                            <video src={msg.content} controls style={{ maxWidth: "100%", borderRadius: 8 }} />
                          )}
                          {msg.type === "voice" && <audio src={msg.content} controls />}
                          {msg.type === "file" && (
                            <a href={msg.content} download={msg.fileName}>
                              {msg.fileName}
                            </a>
                          )}
                        </Box>
                      </Box>
                    );
                  })} */}
                {
                  messages.map((msg, index) => {
                    // console.log(msg)
                    const isCurrentUser = msg.sender === UserId || msg.sender === UserId;
                    // console.log(msg.sender == UserId)
                    // console.log(UserId)
                    const timestamp = msg.timestamp
                      ? new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : "12:05 PM";

                    return (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent={isCurrentUser ? "flex-end" : "flex-start"}
                        mb={2}
                      >
                        <Paper
                          elevation={3}
                          sx={{
                            px: 2,
                            py: 1,
                            maxWidth: "60%",
                            borderRadius: 2,
                            bgcolor: isCurrentUser ? "primary.main" : "grey.300",
                            color: isCurrentUser ? "white" : "black",
                          }}
                        >
                          {/* Message Content */}
                          <Box>
                            {msg.image ? (
                              <img
                                src={msg.image}
                                alt={msg.fileName}
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                  borderRadius: "10px",
                                }}
                              />
                            ) : msg.audio ? (
                              <audio controls style={{ width: "250px" }}>
                                <source src={msg.audio} type="audio/wav" />
                                Your browser does not support the audio element.
                              </audio>
                            ) : (
                              <Typography variant="body1">{msg.content}</Typography>
                            )}
                          </Box>

                          {/* Timestamp */}
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              textAlign: "right",
                              mt: 0.5,
                              fontSize: "0.7rem",
                              opacity: 0.7,
                            }}
                          >
                            {timestamp}
                          </Typography>
                        </Paper>
                      </Box>
                    );
                  })
                }
                {/* {
                  messages.map((msg, index) => {
                    const isCurrentUser = msg.sender== UserId;
                    console.log(isCurrentUser )
                    const messageClass = isCurrentUser ? 'message-sent' : 'message-received';
                    const justifyClass = isCurrentUser ? 'justify-end' : 'justify-start';
                    const timestamp = msg.timestamp
                      ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : '12:05 PM';

                    return (
                      <div key={index} className={`message-container mb-3 d-flex ${justifyClass}`}>
                        <div className={`message-bubble px-2 ${messageClass}`}>
                          <p className="message-text mb-0 px-2">
                            {msg.image ? (
                              <img src={msg.image} alt={msg.fileName} style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "10px" }} />
                            ) : msg.audio ? (
                              <audio controls style={{ width: "300px" }} >
                                <source src={msg.audio} type="audio/wav" />
                                Your browser does not support the audio element.
                              </audio>
                            ) : (
                              <span>{msg.content}</span>
                            )}
                          </p>
                          <div className="d-flex justify-content-end">
                            <span className="text-muted mt-1" style={{ fontSize: "10px" }}>
                              {timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                } */}

                {/* {messages
                  .filter((m) => [currentUserId, selectedUser.id].includes(m.sender))
                  .map((msg) => {
                    const isCurrentUser = msg.sender == currentUserId;
                    const reciver = msg.receiver == currentUserId;
                    console.log("isCurrentUser", isCurrentUser)
                    console.log("reciver", reciver)
                    console.log("UserId", selectedUser.id)
                    return (
                      <Box
                        key={msg.id}
                        display="flex"
                        justifyContent={isCurrentUser ? "flex-end" : "flex-start"}
                        mb={2}
                      >
                        <Box
                          px={2}
                          py={1}
                          borderRadius={2}
                          maxWidth="60%"
                          bgcolor={isCurrentUser ? "primary.main" : "grey.300"}
                          color={isCurrentUser ? "white" : "black"}
                        >
                          {msg.content && !msg.image && !msg.audio && (
                            <Typography>{msg.content}</Typography>
                          )}

                          {msg.image && (
                            <img
                              src={msg.image}
                              alt="sent"
                              style={{ maxWidth: "100%", borderRadius: 8 }}
                            />
                          )}

                          {msg.audio && <audio src={msg.audio} controls />}

                          {msg.video && (
                            <video
                              src={msg.video}
                              controls
                              style={{ maxWidth: "100%", borderRadius: 8 }}
                            />
                          )}
                          {msg.file && (
                            <a href={msg.file} download>
                              {msg.fileName || "Download File"}
                            </a>
                          )}
                        </Box>
                      </Box>
                    );
                  })} */}

                {/* 📝 Text Message */}
                {/* 🖼️ Image Message */}
                {/* 🎤 Audio/Voice Message */}
                {/* (Optional) Agar future me video/file ka support add karna ho */}
                {/* Per-chat recordings */}
                {
                  recordings[selectedUser.id]?.map((rec, index) => (
                    <Box key={`rec-${index}`} display="flex" justifyContent="flex-end" mb={2}>
                      <Box px={2} py={1} borderRadius={2} maxWidth="60%" bgcolor="primary.main" color="white">
                        <audio src={rec.url} controls />
                        <Typography variant="caption" display="block" textAlign="right">
                          Recorded
                        </Typography>
                      </Box>
                    </Box>
                  ))
                }
              </Box>

              {/* Input */}
              <Box p={2} display="flex" alignItems="center" bgcolor="white" borderTop="1px solid #ddd">
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <IconButton onClick={() => document.getElementById("file-upload").click()}>
                  📎
                </IconButton>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Type a message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <IconButton color={recording ? "error" : "secondary"} onClick={handleStartRecording}>
                  <MicIcon />
                </IconButton>
                {recording && (
                  <Typography variant="caption" color="error" ml={1}>
                    Recording...
                  </Typography>
                )}
                <IconButton color="primary" onClick={handleSend}>
                  <SendIcon />
                </IconButton>
              </Box>
            </div>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              bgcolor="#fafafa"
            >
              <Typography variant="h5" color="text.secondary">
                Select a chat to start messaging
              </Typography>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}
