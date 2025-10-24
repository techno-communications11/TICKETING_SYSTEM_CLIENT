import { Avatar, Button, CircularProgress, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadDocCompo from '../Components/UploadDocCompo/UploadDocCompo';
import { completeTicketFromAgent, getalltickets } from '../Services/tickets.services';
import { useSocket } from '../Context/socket.context';
import cookie from 'js-cookie';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import { addNotificationsServices } from '../Services/notifications.services';
import AgentComments from './AgentComments';
import { addNewTicketProgressServices } from '../Services/ticketprogress.services';
function AgentReviewTickets() {
    const [detailTicket, setDetailTicket] = useState([]);
    const { socket } = useSocket();
    const [loading, setLoading] = useState(false);
    const [tLoading, setTloading] = useState(false);
    const userID = cookie.get('id');
    const { id } = useParams();

    const filteredTickets = useCallback(async () => {
        setTloading(true);
        try {
            const response = await getalltickets();
            const filterartion = response.data.data.filter((data) => data.id == id);
            // const filterartion = response.data.data.filter((data) => data.assignerId === id);
            setDetailTicket(filterartion);
        } catch (error) {
            setTloading(false);
            console.log(error.message);
        } finally {
            setTloading(false);
        }
    }, [])
    useEffect(() => {
        filteredTickets();
    }, [filteredTickets])

    const handleCompleteTicketBtn = async () => {
        setLoading(true);

        try {
            const response = await completeTicketFromAgent(detailTicket[0]?.id);
            if (response.data.status === 200) {
                filteredTickets();
                const notificationObj = {
                    ticketId: detailTicket[0]?.id,
                    ticket_Id: detailTicket[0]?.ticketId,
                    recipientId: detailTicket[0]?.managerID,
                    senderId: userID,
                    notification_type: "complete ticket",
                    marketmanager: detailTicket[0]?.marketManager_id,
                    distrcitmanager: detailTicket[0]?.districtManager_id,
                }
                const obj = {
                    ticketId: detailTicket[0]?.id,
                    status: "Completed by Agent",
                    updatedBy: detailTicket[0]?.id,
                };
                const responseNoti = await addNewTicketProgressServices(obj);
                if (responseNoti.data.status === 200) {
                    socket.emit('notify', notificationObj)
                }
            }
        } catch (error) {
            setLoading(false);
            console.log('server error', error.message)
        } finally {
            setLoading(false);
        }
    }

    if (tLoading || detailTicket.length < 0) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <CircularProgress />
        </div>
    }
    return (
        <div className='container-fluid d-flex flex-column gap-3'>
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
                        {
                            detailTicket[0]?.agentstatus === "complete" ?
                                <TextField
                                    size='small'
                                    value={detailTicket[0]?.agentstatus}
                                    InputProps={{ readOnly: true }}
                                    disabled
                                    variant="outlined"
                                /> : <TextField
                                    size='small'
                                    value={"open"}
                                    InputProps={{ readOnly: true }}
                                    disabled
                                    variant="outlined"
                                />
                        }
                        <Button variant='contained' disabled={loading || detailTicket[0]?.agentstatus === "complete"} onClick={handleCompleteTicketBtn}>{loading ? <CircularProgress size={25} /> : "Ticket Complete"}</Button>
                    </div>
                </div>
            </div>
            <div className="row">
                <Typography variant='h6' className='mb-3'>Detail</Typography>
                <div className="col-md-8">
                    <div className="row d-flex g-3">
                        <div className="col-md-6">
                            <Typography variant='h6' sx={{ fontSize: "18px" }} className='mb-2'>Ticket Creator :</Typography>
                            <Typography variant='body1'><span className='fw-semibold'>Name:</span> {detailTicket[0]?.name}</Typography>
                            <Typography variant='body1'><span className='fw-semibold'>Email:</span> {detailTicket[0]?.email}</Typography>
                            <Typography variant='body1'><span className='fw-semibold'>Department:</span> {'N/A'}</Typography>
                            {/* <Typography variant='body1'><span className='fw-semibold'>Department:</span> {detailTicket[0]?.name}</Typography> */}
                            <Typography variant='body1'><span className='fw-semibold'>Created At:</span> {detailTicket[0]?.createdAt && moment(detailTicket[0]?.createdAt).format("DD-MM-YYYY hh:mm A")}</Typography>
                        </div>
                        <div className="col-md-6">
                            <Typography variant='h6' sx={{ fontSize: "18px" }} className='mb-2'>Department:</Typography>
                            <Typography variant='body1'><span className='fw-semibold'>Department Name:</span> {detailTicket[0]?.department}</Typography>
                            <Typography variant='body1'><span className='fw-semibold'>Department Email:</span> {"N/A"}</Typography>
                            <Typography variant='body1'><span className='fw-semibold'>Department Manager Name:</span> {detailTicket[0]?.managerName}</Typography>
                            <Typography variant='body1'><span className='fw-semibold'>Department Manager Email:</span> {detailTicket[0]?.managerName_email}</Typography>
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
                            <Typography variant='body1'><span className='fw-semibold'>Assignee Email:</span> {"N/A"}</Typography>
                            <Typography variant='body1'><span className='fw-semibold'>Assigned At:</span> {detailTicket[0]?.status}</Typography>
                            <Typography variant='body1'><span className='fw-semibold'>Agent Status:</span> {detailTicket[0]?.agentstatus}</Typography>
                            <Typography variant='body1'><span className='fw-semibold'>Agent Complete At :</span> {detailTicket[0]?.completedAt ? moment(detailTicket[0]?.completedAt).format("DD-MM-YYYY hh:mm A") : "N/A"}</Typography>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    {detailTicket[0]?.files && JSON.parse(detailTicket[0].files).length > 0 ? (
                        <UploadDocCompo images={JSON.parse(detailTicket[0].files)} />
                    ) : (
                        <div className="slide-content text-center d-flex align-items-center justify-content-center" style={{ height: "300px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
                            <p className="text-muted">No images available</p>
                        </div>
                    )}
                    {/* <UploadDocCompo images={detailTicket[0]?.files} /> */}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="mt-4">
                        <AgentComments ticketId={detailTicket[0]?.id} />
                        {/* <List className="mb-3 py-3 px-3 border border-dark rounded-3 bg-white" style={{ height: "400px", overflow: "auto" }}>
                            {comments.map((comment, index) => (
                                <ListItem key={index} alignItems="flex-start" style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }} className="d-flex">
                                    <Avatar>{comment.user.charAt(0)}</Avatar>
                                    <ListItemText
                                        className="ms-3"
                                        primary={<Typography variant="subtitle2" fontWeight="bold">{comment.user}</Typography>}
                                        secondary={
                                            <>
                                                <Typography variant="body2" style={{ background: "#f4f6f8", padding: "8px", borderRadius: "10px" }}>{comment.text}</Typography>
                                                <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginTop: "5px" }}>{comment.time}</Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                            <Typography variant="body2" style={{ background: "#f4f6f8", padding: "8px", borderRadius: "10px" }}>Working on it</Typography>

                        </List>
                        <TextField
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
                            // value={note}
                            // onChange={(e) => setNote(e.target.value)}
                            placeholder="Add a comment..."
                        />
                        <div className="text-end">
                            <Button variant='contained' disabled className="mt-2" onClick={() => {
                                setComments([...comments, note]);
                                setNote("");
                            }}>Submit Comment</Button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentReviewTickets