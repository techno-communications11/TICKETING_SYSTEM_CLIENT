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
import { getAllUsers } from '../Services/auth.services';
import TicketProgress from '../Components/TicketProgress/TicketProgress';
import ManagerComments from '../Managers/ManagerComments';
function DistrictManagerReviewTickets() {
  const [comments, setComments] = useState([
    { user: "John Doe", text: "This ticket needs urgent attention!", time: "10:30 AM" },
    { user: "Alice Smith", text: "Noted, will look into it.", time: "10:45 AM" },
    { user: "Robert Johnson", text: "We need more details on this.", time: "11:00 AM" },
    { user: "Emily Davis", text: "I'll handle this ticket.", time: "11:15 AM" },
    { user: "Michael Brown", text: "Please update the status.", time: "11:30 AM" },
    { user: "Sarah Connor", text: "Ticket is under review.", time: "11:45 AM" }
  ]);
  const [assignieName, setAssigneeName] = useState({ name: "", id: "", assign_email: "" });
  const [detailTicket, setDetailTicket] = useState([]);
  const { socket } = useSocket();
  const [loading, setLoading] = useState(false);
  const [assignUsers, setAssignUsers] = useState([]);
  const userId = cookie.get('id')
  const { id } = useParams()
  const decodedTickets = decodeToken();
  const { department, subDepartment } = decodedTickets;
  const [assignLoader, setAssignLoader] = useState(false);
  const [tloading, settLoading] = useState(false);
  const filteredTickets = useCallback(async () => {
    settLoading(true)
    try {
      const response = await getalltickets();
      const filterartion = response.data.data.filter((data) => data.id === id);
      setDetailTicket(filterartion);
      console.log(filterartion);
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
        const getUsers = await getAllUsers();
        const filteredUser = getUsers.data.data.filter((data) => data.department === department);
        setAssignUsers(filteredUser);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [department]);
  useEffect(() => {
    filteredTickets();
  }, [filteredTickets])

  useEffect(() => {
    if (socket && detailTicket?.length > 0) {
      const handleCloseTicket = (ticket) => {
        if (ticket.managerId && ticket.managerId === id) {
          toast.success(`🎉 Ticket #${ticket.ticketId} has been closed!`);
          filteredTickets()
        }
      };
      socket.on("ticket closed by manager", handleCloseTicket);
      return () => {
        socket.off("ticket closed by manager", handleCloseTicket);
      };
    }
  }, [socket, detailTicket, filteredTickets, id]);

  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          console.log("Notification permission granted!");
        }
      });
    }
  }, []);

  useEffect(() => {
    if ('Notification' in window) {
      requestNotificationPermission();
    }
  }, [requestNotificationPermission])

  if (tloading || detailTicket.length < 0) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <CircularProgress />
    </div>
  } else if (detailTicket.length < 0) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      Data NOt FOund Yet
    </div>
  }

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
                  <Typography variant='body1'><span className='fw-semibold'>Department Email:</span> {detailTicket[0]?.istransfereticket
                    ? transferedData?.department_email : detailTicket[0]?.department_email}</Typography>
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
                  <Typography variant='body1'><span className='fw-semibold'>Assigned By:</span> {detailTicket[0]?.assignedmanagername || "-"}</Typography>
                  <Typography variant='body1'><span className='fw-semibold'>Assigned To:</span> {detailTicket[0]?.assignerName || "-"}</Typography>
                  <Typography variant='body1'><span className='fw-semibold'>Assignee Email:</span> {detailTicket[0]?.assign_email || "-"}</Typography>
                  <Typography variant='body1'><span className='fw-semibold'>Assigned At:</span> {detailTicket[0]?.assign_At ? moment(detailTicket[0]?.assign_At).format("DD-MM-YYYY hh:mm A") : "-"}</Typography>
                  <Typography variant='body1'><span className='fw-semibold'>Agent Status:</span> {detailTicket[0]?.agentstatus || "-"}</Typography>
                  <Typography variant='body1'><span className='fw-semibold'>Agent Complete At :</span> {detailTicket[0]?.completedAt ? moment(detailTicket[0]?.completedAt).format("DD-MM-YYYY hh:mm A") : "-"}</Typography>
                </div>
              </div>
          }
        </div>
        <div className="col-md-4">
          {detailTicket[0]?.files && JSON.parse(detailTicket[0].files).length > 0 ? (
            <UploadDocCompo images={JSON.parse(detailTicket[0].files)} />
          ) : (
            <div className="slide-content text-center d-flex align-items-center justify-content-center" style={{ height: "300px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
              <p className="text-muted">No images available</p>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mt-4">
            <ManagerComments ticketId={detailTicket[0]?.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DistrictManagerReviewTickets