import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { assignedTicketServices, closeTicket, getalltickets, ticketProgressServices } from '../Services/tickets.services';
import { useSocket } from '../Context/socket.context';
import cookie from 'js-cookie';
import moment from 'moment/moment';
import UploadDocCompo from '../Components/UploadDocCompo/UploadDocCompo';
import TicketTracking from '../Components/TicketTracking/TicketTracking';
import { decodeToken } from '../Utils/decodedToken.utils';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addNotificationsServices } from '../Services/notifications.services';
import { getAllUser } from '../Services/auth.services';
import TicketProgress from '../Components/TicketProgress/TicketProgress';
import ManagerComments from '../Managers/ManagerComments';
import ShowAttachmentsFile from '../Components/ShowAttachmentsFile/ShowAttachmentsFile';

function StoreReviewTickets() {
    const [detailTicket, setDetailTicket] = useState([]);
    const { id } = useParams()
    const decodedTickets = decodeToken();
    const { department } = decodedTickets;
    const [tloading, settLoading] = useState(false);
    const [transferedData, setTranferedData] = useState([])
    const filteredTickets = useCallback(async () => {
        settLoading(true)
        try {
            const response = await getalltickets();
            const fil = response.data.data.filter((data) => data.id === id);
            settLoading(false)
            setDetailTicket(fil || []);
            console.log(fil || []);
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
                const filteredUser = getUsers.data.data.filter((data) => {
                    const isSameDept = data.department == department;
                    const isNotGmail = !data.email?.toLowerCase().includes("@gmail.com");
                    const name = data.name?.toLowerCase() || "";
                    const isNotTestName =
                        !name.includes("test") && !name.includes("testing") && !name.includes("test tes");

                    return isSameDept && isNotGmail && isNotTestName;
                });
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [department]);
    useEffect(() => {
        filteredTickets();
    }, [])

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
                    <Typography variant="h6" gutterBottom>
                        Uploaded Images:
                    </Typography>
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
                        <div className="slide-content text-center d-flex align-items-center justify-content-center" style={{ height: "300px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
                            <p className="text-muted">No Attachments available</p>
                        </div>
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

export default StoreReviewTickets