import { Avatar, Button, CircularProgress, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { assignedTicketServices, closeTicket, getalltickets, ticketProgressServices, updateTicketStatus } from '../Services/tickets.services';
import { useSocket } from '../Context/socket.context';
import cookie from 'js-cookie';
import moment from 'moment/moment';
import UploadDocCompo from '../Components/UploadDocCompo/UploadDocCompo';
import TicketTracking from '../Components/TicketTracking/TicketTracking';
import { decodeToken } from '../Utils/decodedToken.utils';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addNotificationsServices } from '../Services/notifications.services';
import { getAllUser, getAllUsers } from '../Services/auth.services';
import TicketProgress from '../Components/TicketProgress/TicketProgress';
import ManagerComments from './ManagerComments';
import ManagerTransferedTickets from './ManagerTransferedTickets';
import ShowAttachmentsFile from '../Components/ShowAttachmentsFile/ShowAttachmentsFile';
import { useGlobalState } from '../Context/context';

function ManagerReviewTicketDetail() {
    const [assignieName, setAssigneeName] = useState({ name: "", id: "", assign_email: "" });
    const [detailTicket, setDetailTicket] = useState([]);
    const { socket } = useSocket();
    const { ip } = useGlobalState();
    const [loading, setLoading] = useState(false);
    const [assignUsers, setAssignUsers] = useState([]);
    const userId = cookie.get('id')
    const { id } = useParams()
    const decodedTickets = decodeToken();
    const { department, subDepartment } = decodedTickets;
    const [assignLoader, setAssignLoader] = useState(false);
    const [tloading, settLoading] = useState(false);
    const [transferedData, setTranferedData] = useState([])
    const filteredTickets = useCallback(async () => {
        settLoading(true)
        try {
            const response = await getalltickets(ip, userId, "review tickets");
            const fil = response.data.data.filter((data) => data.id === id);
            settLoading(false)
            setDetailTicket(fil || []);
        } catch (error) {
            settLoading(false)
            console.log(error.message);
        } finally {
            settLoading(false)
        }
    }, [id])
    useEffect(() => {
        if (!department) return;
        const fetchUsers = async () => {
            try {
                const getUsers = await getAllUser();
                // const filteredUser = getUsers.data.data.filter((data) => data.department === department);
                const filteredUser = getUsers.data.data.filter((data) => {
                    // Department check
                    const isSameDept = data.department == department;

                    // Email check (exclude @gmail.com)
                    const isNotGmail = !data.email?.toLowerCase().includes("@gmail.com");

                    // Name check (exclude test/test tes/testing types)
                    const name = data.name?.toLowerCase() || "";
                    const isNotTestName =
                        !name.includes("test") && !name.includes("testing") && !name.includes("test tes");

                    return isSameDept && isNotGmail && isNotTestName;
                });

                setAssignUsers(filteredUser);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [department]);
    useEffect(() => {
        filteredTickets();
    }, [])

    // useEffect(() => {
    //     if (socket && detailTicket?.length > 0) {
    //         if (detailTicket[0].status === "pending") {
    //             updateTicketStatus(detailTicket[0]._id)
    //                 .then(async (response) => {
    //                     try {
    //                         const resposne = await ticketProgressServices(detailTicket[0]?._id, "Review Ticket");
    //                     } catch (error) {
    //                         console.log("ERROR FROM UPDATING TICKET PROGRESS", error.message)
    //                     }
    //                 })
    //                 .catch(error => {
    //                     console.error("Failed to update ticket status:", error);
    //                 });
    //             const notificationObj = {
    //                 ticketId: detailTicket[0]?._id,
    //                 ticket_Id: detailTicket[0]?.ticketId,
    //                 recipientId: "",
    //                 manager: detailTicket[0]?.marketManager_id,
    //                 marketmanager: detailTicket[0]?.marketManager_id,
    //                 distrcitmanager: detailTicket[0]?.districtManager_id,
    //                 senderId: userId,
    //                 notification_type: "ticket review",
    //             };
    //             socket.emit('notify', notificationObj)
    //             filteredTickets();
    //         }
    //         const handleCloseTicket = (ticket) => {
    //             if (ticket.managerId && ticket.managerId === id) {
    //                 toast.success(`🎉 Ticket #${ticket.ticketId} has been closed!`);
    //                 filteredTickets()
    //             }
    //         };
    //         socket.on("ticket closed by manager", handleCloseTicket);
    //         return () => {
    //             socket.off("ticket closed by manager", handleCloseTicket);
    //         };
    //     }
    // }, [socket, filteredTickets, id]);
    const handleAssignee = (e) => {
        const selectedAssignee = assignUsers.find(user => user.name === e.target.value);
        if (selectedAssignee) {
            setAssigneeName({
                name: selectedAssignee.name,
                id: selectedAssignee.id,
                assign_email: selectedAssignee?.email
            });
        }
    };

    const handleChangeStatus = async (e) => {
        setLoading(true)
        try {
            const notificationObj = {
                ticketId: detailTicket[0]?.id,
                ticket_Id: detailTicket[0]?.ticketId,
                recipientId: detailTicket[0]?.assignerId,
                manager: detailTicket[0]?.managerID,
                marketmanager: detailTicket[0]?.marketManager_id,
                distrcitmanager: detailTicket[0]?.districtManager_id,
                senderId: id,
                notification_type: "ticket closed",
            };
            socket.emit('notify', notificationObj)
            await addNotificationsServices(notificationObj);
            closeTicket(detailTicket[0].id)
                .then(async (response) => {
                    // console.log(response)
                    if (response.data.status == 200) {
                        try {
                            // const resposne = await ticketProgressServices(detailTicket[0]?._id, "Closed");
                            toast.success(`🎉 Ticket #${detailTicket[0].ticketId} has been closed!`);
                            filteredTickets()
                            setTimeout(() => {
                                setLoading(false)
                            }, 3000);
                        } catch (error) {
                            setLoading(false)
                            console.log("ERROR FROM UPDATING TICKET PROGRESS", error.message)
                        }
                    }
                })
                .catch(error => {
                    setLoading(false)
                    console.error("Failed to update ticket status:", error.message);
                });
            return setLoading(false);
        } catch (error) {
            setLoading(false)
            console.log("error", error.message)
        } finally {
            setLoading(false)
        }
    }
    const showBrowserNotification = async (title, description) => {
        if ('Notification' in window && Notification.permission === "granted") {
            console.log("after sent notification", title, description)
            new Notification(title, {
                body: description,
                icon: "https://ticketing-systems-five.vercel.app/logo.webp"
            });
        } else {
            console.log("Notification permission not granted.");
        }
    };

    // const requestNotificationPermission = useCallback(() => {
    //     if ('Notification' in window) {
    //         Notification.requestPermission().then(function (permission) {
    //             if (permission === 'granted') {
    //                 console.log("Notification permission granted!");
    //             }
    //         });
    //     }
    // }, []);

    // useEffect(() => {
    //     if ('Notification' in window) {
    //         requestNotificationPermission();
    //     }
    // }, [requestNotificationPermission])

    const handleAssign = async () => {
        setAssignLoader(true);
        // showBrowserNotification("Hello Developer!", "Testing mode");
        if (!assignieName.id) {
            toast.error("Please select an assignee!", { position: "top-right" });
            return;
        }
        try {
            const ticketData = await getAllUser();
            const filteredCurrentUser = ticketData.data.data.filter((data) => data.id == userId)
            const filteredUserEmail = ticketData.data.data.filter((data) => data.id == assignieName.id)
            const allTickets = await getalltickets();
            const filtered = allTickets.data.data.filter((data) => data.id == id);
            const response = await assignedTicketServices(id, assignieName.id, assignieName.name, filtered[0]?.ticketId, filtered[0], filteredUserEmail[0]?.email, filteredCurrentUser[0]?.name, assignieName.assign_email);
            if (response.data.status === 200) {
                const notificationObj = {
                    ticketId: filtered[0]?.id,
                    ticket_Id: filtered[0]?.ticketId,
                    recipientId: assignieName.id,
                    senderId: filtered[0]?.managerID,
                    notification_type: "assign to agent",
                    marketmanager: filtered[0]?.marketManager_id,
                    distrcitmanager: filtered[0]?.districtManager_id,
                }
                if (socket) {
                    socket.emit('notify', notificationObj)
                    const responseNoti = await addNotificationsServices(notificationObj);
                    toast.success(`Ticket assigned to ${assignieName.name} successfully!`, { position: "top-right" })
                } else {
                    setAssignLoader(false)
                    console.warn("⚠️ Socket not connected, unable to send ticket event.");
                }
                filteredTickets()
                try {
                    const resposne = await ticketProgressServices(filtered[0]?.id, "Assigned to Agent");
                    filteredTickets()
                } catch (error) {
                    setAssignLoader(false)
                    console.log("ERROR FROM UPDATING TICKET PROGRESS", error.message)
                }
            }
        } catch (error) {
            setAssignLoader(false);
            toast.error("Error assigning ticket!", { position: "top-right" });
            console.error("Error from detail tickets:", error.message);
        } finally {
            setAssigneeName({
                name: "",
                id: "",
                assign_email: ""
            });
            filteredTickets()
            setAssignLoader(false);
        }
    };
    const filteredData = useCallback(async () => {
        try {
            const response = await getAllUser();
            const filet = response.data.data.filter((data) => data.id === detailTicket[0]?.currentOwnerId)
            setTranferedData(filet[0])
        } catch (error) {

        }
    }, [detailTicket[0]?.currentOwnerId])
    useEffect(() => {
        filteredData();
    }, [filteredData, detailTicket[0]?.currentOwnerId])


    if (tloading || detailTicket.length < 0) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <CircularProgress />
        </div>
    } else if (detailTicket.length < 0) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            Data NOt FOund Yet
        </div>
    }

    // console.log( JSON.parse(detailTicket[0]?.progress))
    const latestStatus = detailTicket[0]?.progress[detailTicket[0]?.progress.length - 1].status;

    return (
        <div className='container d-flex flex-column gap-3'>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IconButton
                            sx={{
                                '& .MuiSvgIcon-root': {
                                    transition: 'color 0.3s ease',
                                },
                            }}
                            onClick={() => window.history.back()}
                            onMouseEnter={(e) => {
                                e.currentTarget.querySelector('.MuiSvgIcon-root').style.color = '#6f2da8';
                            }}
                        >
                            <ArrowBackIcon sx={{ color: '#000000' }} />
                        </IconButton>
                        <Typography
                            variant='h2'
                            sx={{
                                color: '#333333',
                                fontWeight: 'bold',
                                fontSize: "24px"
                            }}
                        >
                            {detailTicket[0]?.ticketId} - Progress
                        </Typography>
                    </div>
                    <div className="d-flex align-items-center" style={{ gap: "0px 10px" }}>
                        <div className="d-flex gap-2">
                            <TextField
                                size='small'
                                sx={{ width: "150px" }}
                                value={detailTicket[0]?.status}
                                InputProps={{ readOnly: true }}
                                disabled
                                variant="outlined"
                            />
                            <Button variant='contained' disabled={loading || detailTicket[0]?.status === 'close'} onClick={handleChangeStatus}>{loading ? <CircularProgress size={25} /> : "Closed"}</Button>
                            {
                                detailTicket[0]?.status === 'close' ?
                                    <Button variant='outlined' disabled>Re-open</Button> : ""
                            }
                        </div>
                        <ManagerTransferedTickets loading={loading} ticketData={detailTicket[0]} filteredTickets={filteredTickets} />
                        {/* <Button variant='contained' disabled={loading || detailTicket[0]?.status === 'close'} onClick={handleChangeStatus}>{loading ? <CircularProgress size={25} /> : "Transfer"}</Button> */}
                        <div className="d-flex gap-2">
                            {
                                detailTicket[0]?.assignerId ?
                                    <TextField
                                        label="status"
                                        variant="outlined"
                                        disabled
                                        value={detailTicket[0]?.assignerName}
                                        InputProps={{ readOnly: true }}
                                        sx={{ width: "150px" }}
                                    /> :
                                    <FormControl size='small' sx={{ width: "150px" }}>
                                        <InputLabel>Assign To</InputLabel>
                                        <Select value={assignieName.name} onChange={handleAssignee}>
                                            {assignUsers.length > 0 ? (
                                                assignUsers.map((user) => (
                                                    <MenuItem key={user._id} value={user.name}>
                                                        {user.name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem disabled>No users available</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                            }
                            {/* <FormControl size='small' sx={{ width: "150px" }}>
                            <InputLabel>Assign To</InputLabel>
                            <Select value={assignieName.name} onChange={handleAssignee}>
                                {assignUsers.length > 0 ? (
                                    assignUsers.map((user) => (
                                        <MenuItem key={user._id} value={user.name}>
                                            {user.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No users available</MenuItem>
                                )}
                            </Select>
                        </FormControl> */}
                            {/*disabled={assignLoader || detailTicket[0]?.assignerId}   */}
                            <Button variant='contained' disabled={assignLoader || detailTicket[0]?.assignerId} onClick={handleAssign} >{assignLoader ? <CircularProgress size={25} /> : "Assign"}</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <TicketProgress status={latestStatus} /> */}
            <div className="row">
                <Typography variant='h6' className='mb-3'>Detail</Typography>
                <div className="col-md-8">
                    {
                        tloading ? <div className="d-flex justify-content-center align-items-center"><CircularProgress /></div> :
                            <div className="row d-flex g-3">
                                <div className="col-md-6">
                                    <Typography variant='h6' sx={{ fontSize: "18px" }} className='mb-2'>Ticket Creator :</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Name:</span> {detailTicket[0]?.name}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Email:</span> {detailTicket[0]?.email}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Department:</span> {'N/A'}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Created At:</span> {detailTicket[0]?.createdAt && moment(detailTicket[0]?.createdAt).format("DD-MM-YYYY hh:mm A")}</Typography>
                                </div>
                                <div className="col-md-6">
                                    <Typography variant='h6' sx={{ fontSize: "18px" }} className='mb-2'>Department:</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Department Name:</span> {detailTicket[0]?.istransfereticket
                                        ? detailTicket[0]?.departmentName : detailTicket[0]?.department}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Department Email:</span> {"N/A"}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Department Manager Name:</span> {detailTicket[0]?.istransfereticket
                                        ? transferedData?.name : detailTicket[0]?.managerName}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Department Manager Email:</span> {detailTicket[0]?.istransfereticket
                                        ? transferedData?.email : detailTicket[0]?.managerName_email}</Typography>
                                </div>
                                <div className="col-md-6">
                                    <Typography variant='h6' sx={{ fontSize: "18px" }} className='mb-2'>Ticket Detail:</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Ticket ID:</span> {detailTicket[0]?.ticketId}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Type of Ticket:</span> {detailTicket[0]?.category}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Description:</span>{detailTicket[0]?.ticketDescription}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Market:</span> {detailTicket[0]?.market}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Store:</span>{detailTicket[0]?.store}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Store Email:</span> {detailTicket[0]?.store_email}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Store Phone:</span> {detailTicket[0]?.store_phone}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Priority:</span> {detailTicket[0]?.priority}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Aproved:</span> {detailTicket[0]?.approved === true ? "Aproved" : "N/A"}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Current Status:</span> {detailTicket[0]?.status}</Typography>
                                </div>
                                <div className="col-md-6">
                                    <Typography variant='h6' sx={{ fontSize: "18px" }} className='mb-2'>Agent  Detail:</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Assigned By:</span> {detailTicket[0]?.assignedmanagername}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Assigned To:</span> {detailTicket[0]?.assignerName}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Assignee Email:</span> {detailTicket[0]?.assign_email || "N/A"}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Assigned At:</span> {detailTicket[0]?.assign_At ? moment(detailTicket[0]?.assign_At).format("DD-MM-YYYY hh:mm A") : "N/A"}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Agent Status:</span> {detailTicket[0]?.agentstatus}</Typography>
                                    <Typography variant='body1'><span className='fw-semibold'>Agent Complete At :</span> {detailTicket[0]?.completedAt ? moment(detailTicket[0]?.completedAt).format("DD-MM-YYYY hh:mm A") : "N/A"}</Typography>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-md-4">
                    <Typography variant='h6' className='mb-3'>Images</Typography>
                    {/* {detailTicket[0]?.files != [] && <UploadDocCompo images={detailTicket[0]?.files || []} />} */}
                    {detailTicket[0]?.files && JSON.parse(detailTicket[0].files).length > 0 ? (
                        <UploadDocCompo images={JSON.parse(detailTicket[0].files)} />
                    ) : (
                        <div className="slide-content text-center d-flex align-items-center justify-content-center" style={{ height: "300px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
                            <p className="text-muted">No images available</p>
                        </div>
                    )}
                </div>
                <div className="col-md-4">
                    <Typography variant="h6" gutterBottom>
                        Uploaded Documents:
                    </Typography>
                    {detailTicket[0]?.documents && JSON.parse(detailTicket[0]?.documents).length > 0 ? (
                        <ShowAttachmentsFile documents={JSON.parse(detailTicket[0]?.documents)} />
                    ) : (
                        <Typography color="textSecondary">
                            No documents uploaded yet.
                        </Typography>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <ManagerComments ticketId={detailTicket[0]?.id} />
                </div>
            </div>
        </div>
    )
}

export default ManagerReviewTicketDetail